document.addEventListener("DOMContentLoaded", () => {
  // Carrega o JSON com os produtos
  fetch("produtos/produtos.json")
    .then(response => response.json())
    .then(produtos => {

      const animacaoJaRodou = sessionStorage.getItem("animacaoRodou");
      const animacaoContainer = document.querySelector(".animacaoContainerAnimacao");

      if (!animacaoJaRodou) {
        // Mostra a animação
        if (animacaoContainer) animacaoContainer.style.display = "block";

        // Depois de 13s, inicia o site e oculta a animação
        setTimeout(() => {
          iniciarSite(produtos); // inicializa o site com os produtos
          if (animacaoContainer) {
            animacaoContainer.style.transition = "opacity 0.5s";
            animacaoContainer.style.opacity = "0";
            setTimeout(() => animacaoContainer.style.display = "none", 500);
          }

          sessionStorage.setItem("animacaoRodou", "true");
        }, 13100);

      } else {
        // Se já rodou, inicia o site direto e garante que a animação está oculta
        if (animacaoContainer) animacaoContainer.style.display = "none";
        iniciarSite(produtos); // inicializa o site direto
      }

    })
    .catch(error => console.error("Erro ao carregar produtos:", error));
});





function iniciarSite(produtos) {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const catalogo = document.getElementById("catalogo");
  const btnCarrinho = document.getElementById("btnCarrinho");
  const navbar = document.querySelector(".navbar");
  let carrinho = [];
  let lastScroll = 0;
  let idsCriados = {};

  // ---------------- Menu hamburguer ----------------
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      menu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // ---------------- Esconde navbar no scroll ----------------
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 50) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }
    lastScroll = currentScroll;
  });

  produtos.forEach((produto, i) => {
    // Gera um ID único se não existir
    produto.id = produto.id || `prod-${i}`;

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = produto.id; // Armazena o ID no DOM

    // Adiciona ID único por categoria
    if (!idsCriados[produto.tamanho]) {
      if (produto.tamanho === "30 cm") card.id = "mandalas30";
      if (produto.tamanho === "15 cm") card.id = "mandalas15";
      if (produto.tamanho === "11 cm") card.id = "mandalas11";
      if (produto.tamanho === "Diversos") card.id = "cangas";
      idsCriados[produto.tamanho] = true;
    }

    // ---- Carrossel do card ----
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

        produto.imagens.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = "img/loading.jpg"; // imagem padrão visível primeiro
      img.dataset.src = src;
      img.classList.add("carousel-item", "lazy-media");
      if (i === 0) img.classList.add("active");
      carousel.appendChild(img);
    });



    if (produto.video) {
      const video = document.createElement("video");
      video.dataset.src = produto.video;
      video.classList.add("carousel-item", "lazy-media");
      // Lazy load + performance
      video.preload = "none";      // não baixa antes de aparecer
      video.muted = true;          // autoplay permitido
      video.loop = true;            // repete
      video.playsInline = true;    // mobile
      video.volume = 0;             // silenciado

      carousel.appendChild(video);
    }

    // ---------- Lazy Load + Controle de Reprodução (1 vídeo por vez) ----------
    const lazyMedia = carousel.querySelectorAll(".lazy-media");

    const mediaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const isVideo = el.tagName === "VIDEO";
        const src = el.dataset.src;

        if (entry.isIntersecting) {
          // Só carrega quando entra na tela
          if (el.classList.contains("lazy-media")) {

            if (el.tagName === "IMG") {
              // Mostra imagem padrão até carregar a real
              const placeholder = el.src || "img/loading.jpg";
              el.src = placeholder;

              const realImg = new Image();
              realImg.src = src;
              realImg.onload = () => {
                el.src = src;
                el.classList.remove("lazy-media");
              };
            }

            else if (isVideo) {
              el.src = src;
              el.preload = "metadata";
              el.loop = true;
              el.classList.remove("lazy-media");
            }
          }

          // Controle: toca apenas um vídeo por vez
          if (isVideo) {
            document.querySelectorAll("video.carousel-item").forEach(v => {
              if (v !== el && !v.paused) v.pause();
            });
            el.play().catch(() => {});
          }

        } else {
          if (isVideo && !el.paused) el.pause();
        }
      });
    }, { rootMargin: "200px", threshold: 0.2 });

    lazyMedia.forEach(el => mediaObserver.observe(el));




    // Controles internos do card
    const controls = document.createElement("div");
    controls.classList.add("carousel-controls");
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "‹";
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "›";
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    carousel.appendChild(controls);

    let currentIndex = 0;
    const items = carousel.querySelectorAll(".carousel-item");
    const updateSlide = (newIndex) => {
      items[currentIndex].classList.remove("active");
      if (items[currentIndex].tagName === "VIDEO") items[currentIndex].pause();
      currentIndex = newIndex;
      items[currentIndex].classList.add("active");
      if (items[currentIndex].tagName === "VIDEO") items[currentIndex].play();
    };

    prevBtn.addEventListener("click", () => updateSlide((currentIndex - 1 + items.length) % items.length));
    nextBtn.addEventListener("click", () => updateSlide((currentIndex + 1) % items.length));

    // Swipe no mobile do card
    let startX = 0;
    carousel.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
    carousel.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      if (Math.abs(startX - endX) > 50) {
        if (startX > endX) updateSlide((currentIndex + 1) % items.length);
        else updateSlide((currentIndex - 1 + items.length) % items.length);
      }
    });

    // ---- Info ----
    const info = document.createElement("div");
    info.classList.add("info");
    info.innerHTML = `
        <h2>${produto.titulo}</h2>
        <p><strong>Tamanho:</strong> ${produto.tamanho}</p>
        <p>${produto.descricao}</p>
      `;

    // ---- Checkbox ----
    // ---- Checkbox ----
const checkboxLabel = document.createElement("label");
checkboxLabel.classList.add("checkbox-container");

// Se o produto estiver indisponível
if (!produto.disponibilidade) {
  checkboxLabel.innerHTML = `<span class="esgotado">ESGOTADO</span>`;
} else {
  checkboxLabel.innerHTML = `
    <input type="checkbox" class="select-produto">
    <span class="checkmark"></span>
    Selecionar
  `;
}

const checkbox = checkboxLabel.querySelector("input");
if (checkbox) {
  checkbox.addEventListener("change", () => {
    card.classList.toggle("selected", checkbox.checked);

    if (checkbox.checked) {
      if (!carrinho.some(p => p.id === produto.id)) {
        carrinho.push(produto);
      }
    } else {
      carrinho = carrinho.filter(p => p.id !== produto.id);
    }

    btnCarrinho.style.display = carrinho.length > 0 ? "block" : "none";
  });
}

// Se o produto não estiver disponível, deixa o card visualmente “apagado”
if (!produto.disponibilidade) {
  card.style.opacity = "0.5";
  card.style.pointerEvents = "none"; // impede qualquer interação
}

card.appendChild(checkboxLabel);




    // const checkboxLabel = document.createElement("label");
    // checkboxLabel.classList.add("checkbox-container");
    // checkboxLabel.innerHTML = `
    //     <input type="checkbox" class="select-produto">
    //     <span class="checkmark"></span>
    //     Selecionar
    //   `;

    // const checkbox = checkboxLabel.querySelector("input");
    // checkbox.addEventListener("change", () => {
    //   card.classList.toggle("selected", checkbox.checked);

    //   if (checkbox.checked) {
    //     if (!carrinho.some(p => p.id === produto.id)) {
    //       carrinho.push(produto);
    //     }
    //   } else {
    //     carrinho = carrinho.filter(p => p.id !== produto.id);
    //   }

    //   btnCarrinho.style.display = carrinho.length > 0 ? "block" : "none";
    // });

    // card.addEventListener("dblclick", () => {
    //   checkbox.checked = !checkbox.checked;
    //   checkbox.dispatchEvent(new Event("change"));
    // });

    // ---- Adiciona elementos no card ----
    card.appendChild(carousel);
    card.appendChild(info);
    card.appendChild(checkboxLabel);
    catalogo.appendChild(card);

    // ---- Modal do card (imagem/video) ----
    const modal = document.createElement("div");
    modal.id = "modaldeimgdocard";
    modal.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.9); display:none; justify-content:center; align-items:center;
        z-index:2000; flex-direction:column;
      `;
    const modalContent = document.createElement("div");
    modalContent.style.cssText = "position:relative; max-width:90%; max-height:90%; display:flex; align-items:center; justify-content:center;";
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "✕";
    closeBtn.style.cssText = "position:absolute; top:10px; right:15px; font-size:30px; color:white; cursor:pointer; z-index:2100;";
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    items.forEach((item, i) => {
      item.addEventListener("click", () => {
        modal.style.display = "flex";
        modalContent.querySelectorAll("img, video").forEach(el => el.remove());
        modalIndex = i;
        const clone = item.cloneNode(true);
        if (clone.tagName === "VIDEO") clone.muted = true; clone.autoplay = true; clone.volume = 0;
        modalContent.appendChild(clone);
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      modalContent.querySelectorAll("video").forEach(v => v.pause());
    });
  });




  // ---------------- Modal de imagem do card ----------------
  const modalImgCard = document.getElementById("modalDeImgDoCard");
  const modalImgCardContent = document.getElementById("modalDeImgDoCardContent");
  const modalImgCardClose = document.getElementById("modalDeImgDoCardClose");
  let modalItems = [];
  let modalIndex = 0;

  function openModalImgCard(items, startIndex = 0) {
    modalItems = items;
    modalIndex = startIndex;
    showModalItem(modalIndex);
    modalImgCard.style.display = "flex";
  }

  function showModalItem(index) {
    modalImgCardContent.querySelectorAll("img, video").forEach(el => el.remove());
    const item = modalItems[index];
    let element;
    if (item.tagName === "IMG") {
      element = document.createElement("img");
      element.src = item.src;
    } else if (item.tagName === "VIDEO") {
      element = document.createElement("video");
      element.src = item.src;
      element.controls = true;
      element.muted = true;
      element.volume = 0;
      element.autoplay = true;
    
      element.loop = true;
    }
    modalImgCardContent.appendChild(element);
  }

  modalImgCardClose.addEventListener("click", () => modalImgCard.style.display = "none");
  modalImgCard.addEventListener("click", e => {
    if (e.target === modalImgCard) modalImgCard.style.display = "none";
  });

  let startXModal = 0;
  modalImgCardContent.addEventListener("touchstart", e => startXModal = e.touches[0].clientX);
  modalImgCardContent.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (Math.abs(startXModal - endX) > 50) {
      if (startXModal > endX) modalIndex = (modalIndex + 1) % modalItems.length;
      else modalIndex = (modalIndex - 1 + modalItems.length) % modalItems.length;
      showModalItem(modalIndex);
    }
  });

  // ---------------- Carrinho ----------------

  btnCarrinho.addEventListener("click", () => {
    if (carrinho.length === 0) return;

    // Remove modal antigo
    const oldModal = document.getElementById("modalCarrinho");
    if (oldModal) oldModal.remove();

    // Bloqueia scroll do body
    document.body.style.overflow = "hidden";

    // Div externa do modal
    const modal = document.createElement("div");
    modal.id = "modalCarrinho";
    Object.assign(modal.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
      padding: "20px",
      boxSizing: "border-box",
    });

    // Conteúdo principal do modal
    const modalContent = document.createElement("div");
    Object.assign(modalContent.style, {
      background: "#fff",
      borderRadius: "15px",
      width: "100%",
      maxWidth: "800px",
      maxHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      overflow: "hidden", // importante para o overflow interno
      position: "relative"
    });

    // Botão de fechar fixo no topo
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "✖";
    Object.assign(closeBtn.style, {
      alignSelf: "flex-end",
      background: "transparent",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
      color: "#333",
      padding: "15px",
      zIndex: "10"
    });
    closeBtn.addEventListener("click", () => {
      modal.remove();
      document.body.style.overflow = "";
    });
    modalContent.appendChild(closeBtn);

    // Div interna com scroll para os produtos
    const produtosContainer = document.createElement("div");
    Object.assign(produtosContainer.style, {
      flex: "1",           // ocupa o espaço disponível
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      padding: "0 20px 20px 20px"
    });


    // Lista de produtos
    carrinho.forEach((produto) => {
      const item = document.createElement("div");
      Object.assign(item.style, {
        display: "grid",
        gridTemplateColumns: "120px 1fr auto",
        gap: "15px",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        alignItems: "center",
        backgroundColor: "#fafafa"
      });

      // Imagem
      const img = document.createElement("img");
      img.src = produto.imagens[0];
      img.alt = produto.titulo;
      Object.assign(img.style, { width: "100%", height: "auto", borderRadius: "8px", objectFit: "cover" });
      item.appendChild(img);

      // Info
      const info = document.createElement("div");
      info.style.display = "flex";
      info.style.flexDirection = "column";
      info.style.gap = "5px";
      const titulo = document.createElement("h3");
      titulo.innerText = produto.titulo;
      Object.assign(titulo.style, { margin: "0", fontSize: "1rem" });
      const tamanho = document.createElement("span");
      tamanho.innerText = `Tamanho: ${produto.tamanho}`;
      tamanho.style.fontSize = "0.9rem"; tamanho.style.color = "#555";
      const descricao = document.createElement("p");
      descricao.innerText = produto.descricao;
      descricao.style.fontSize = "0.9rem"; descricao.style.color = "#333"; descricao.style.margin = "5px 0 0 0";
      info.appendChild(titulo); info.appendChild(tamanho); info.appendChild(descricao);
      item.appendChild(info);

      // Botão remover
      const removeBtn = document.createElement("button");
      removeBtn.innerText = "❌";
      Object.assign(removeBtn.style, { backgroundColor: "#ff4d4d", border: "none", color: "#fff", padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "1rem", height: "40px", width: "40px" });
      removeBtn.addEventListener("click", () => {
        const indexNoCarrinho = carrinho.findIndex(p => p.id === produto.id);
        if (indexNoCarrinho > -1) carrinho.splice(indexNoCarrinho, 1);
        item.remove();
        atualizarMarcacoes();
      });
      item.appendChild(removeBtn);

      produtosContainer.appendChild(item);
    });

    modalContent.appendChild(produtosContainer);

    // Botão finalizar pedido no rodapé
    const confirmBtn = document.createElement("button");
    confirmBtn.innerText = "Finalizar Pedido";
    Object.assign(confirmBtn.style, {
      padding: "15px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "1rem",
      margin: "10px 20px"
    });
    confirmBtn.addEventListener("click", () => {
      const produtosSelecionados = carrinho.map(p => p.titulo).join("\n");
      let msg = `Olá! Gostaria de fazer o pedido de:\n${produtosSelecionados}`;
      window.open(`https://wa.me/5547984694079?text=${encodeURIComponent(msg)}`, "_blank");
      modal.remove();
      document.body.style.overflow = "";
    });
    modalContent.appendChild(confirmBtn);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  });

  function atualizarMarcacoes() {
    const checkboxes = document.querySelectorAll(".select-produto");

    checkboxes.forEach((checkbox) => {
      const card = checkbox.closest(".card");
      const produtoId = Number(card.dataset.id); // converte para número
      const estaNoCarrinho = carrinho.some(p => p.id === produtoId);

      checkbox.checked = estaNoCarrinho;
      card.classList.toggle("selected", estaNoCarrinho);
    });

    btnCarrinho.style.display = carrinho.length > 0 ? "block" : "none";
    console.log("Marcação atualizada. Itens no carrinho:", carrinho.map(p => p.titulo));
  }

}
