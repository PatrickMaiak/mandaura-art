document.addEventListener("DOMContentLoaded", () => {
  // Carrega o JSON com os produtos
  // fetch("produtos/produtos.json")
  fetch("https://patrickmaiak.github.io/mandaura-data/produtos.json")

  .then(res => res.json())
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


    if (menu.classList.contains("active")) {
    history.pushState({ menuAberto: true }, '');
  }

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

  // 👉 Fecha o menu se estiver aberto ao rolar a tela
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    hamburger.classList.remove("active");
  }

  // 👉 Esconde ou mostra a navbar conforme o scroll
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

















//     // ---- Carrossel do card ----
// const carousel = document.createElement("div");
// carousel.classList.add("carousel");

// // alterna entre vídeo e imagem como primeiro item
// const mostrarVideoPrimeiro = i % 2 === 0; // alterna automaticamente: 0,2,4... vídeo / 1,3,5... imagem

// // Função para adicionar imagens
// const adicionarImagens = () => {
//   produto.imagens.forEach((src, index) => {
//     const img = document.createElement("img");
//     img.src = "img/loading.jpg"; // imagem padrão
//     img.dataset.src = src;
//     img.classList.add("carousel-item", "lazy-media");
//     if (!mostrarVideoPrimeiro && index === 0) img.classList.add("active"); // ativa imagem se for o caso
//     carousel.appendChild(img);
//   });
// };

// // Função para adicionar vídeo
// const adicionarVideo = () => {
//   if (produto.video) {
//     const video = document.createElement("video");
//     video.dataset.src = produto.video;
//     video.classList.add("carousel-item", "lazy-media");
//     video.preload = "none";      // não baixa antes de aparecer
//     video.muted = true;          // autoplay permitido
//     video.loop = true;           // repete
//     video.playsInline = true;    // mobile
//     video.volume = 0;            // silenciado
//     if (mostrarVideoPrimeiro) video.classList.add("active");
//     carousel.appendChild(video);
//   }
// };

// // alterna a ordem conforme o índice
// if (mostrarVideoPrimeiro) {
//   adicionarVideo();
//   adicionarImagens();
// } else {
//   adicionarImagens();
//   adicionarVideo();
// }















//     // ---------- Lazy Load + Controle de Reprodução (1 vídeo por vez) ----------
//     const lazyMedia = carousel.querySelectorAll(".lazy-media");

//     const mediaObserver = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         const el = entry.target;
//         const isVideo = el.tagName === "VIDEO";
//         const src = el.dataset.src;

//         if (entry.isIntersecting) {
//           // Só carrega quando entra na tela
//           if (el.classList.contains("lazy-media")) {

//             if (el.tagName === "IMG") {
//               // Mostra imagem padrão até carregar a real
//               const placeholder = el.src || "img/loading.jpg";
//               el.src = placeholder;

//               const realImg = new Image();
//               realImg.src = src;
//               realImg.onload = () => {
//                 el.src = src;
//                 el.classList.remove("lazy-media");
//               };
//             }

//             else if (isVideo) {
//               el.src = src;
//               el.preload = "metadata";
//               el.loop = true;
//               el.classList.remove("lazy-media");
//             }
//           }

//           // Controle: toca apenas um vídeo por vez
//           if (isVideo) {
//             document.querySelectorAll("video.carousel-item").forEach(v => {
//               if (v !== el && !v.paused) v.pause();
//             });
//             el.play().catch(() => {});
//           }

//         } else {
//           if (isVideo && !el.paused) el.pause();
//         }
//       });
//     }, { rootMargin: "1000px", threshold: 0.1 });

//     lazyMedia.forEach(el => mediaObserver.observe(el));





// ---- Carrossel do card ----
const carousel = document.createElement("div");
carousel.classList.add("carousel");

// ✅ Só o primeiro card (i === 0) começa com vídeo
const mostrarVideoPrimeiro = !!produto.video && i === 0;

// Função para adicionar imagens
const adicionarImagens = () => {
  produto.imagens.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = "ico/loading.png"; // placeholder inicial
    img.dataset.src = src;
    img.classList.add("carousel-item", "lazy-media");
    if (!mostrarVideoPrimeiro && index === 0) img.classList.add("active");
    carousel.appendChild(img);
  });
};

// Função para adicionar vídeo
const adicionarVideo = () => {
  if (!produto.video) return;

  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("muted", "");
  video.style.width = "100%";
  video.style.borderRadius = "10px";

  if (mostrarVideoPrimeiro) {
    // 🔥 primeiro card com vídeo ativo
    video.src = produto.video;
    video.classList.add("carousel-item", "active");
    video.preload = "auto";

    // garante tentativa de autoplay assim que o DOM estiver pronto
    const tentarPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // adiciona listener para liberar autoplay assim que o usuário tocar
          const liberar = () => {
            video.play().catch(() => {});
            document.removeEventListener("click", liberar);
            document.removeEventListener("touchstart", liberar);
            document.removeEventListener("scroll", liberar);
          };
          document.addEventListener("click", liberar);
          document.addEventListener("touchstart", liberar);
          document.addEventListener("scroll", liberar);
        });
      }
    };

    // chama a primeira tentativa logo após renderizar
    requestAnimationFrame(() => {
      video.addEventListener("canplay", tentarPlay, { once: true });

      // reforça a tentativa após um pequeno delay
      setTimeout(() => tentarPlay(), 1500);
    });

  } else {
    // demais cards continuam lazy
    video.dataset.src = produto.video;
    video.preload = "none";
    video.classList.add("carousel-item", "lazy-media");
  }

  carousel.appendChild(video);
};



// alterna ordem: primeiro card = vídeo primeiro / outros = imagem primeiro
if (mostrarVideoPrimeiro) {
  adicionarVideo();
  adicionarImagens();
} else {
  adicionarImagens();
  adicionarVideo();
}



// ---------- Lazy Load otimizado + Delay de 2s + Controle de 1 vídeo ativo ----------
const lazyMedia = carousel.querySelectorAll(".lazy-media");

// Guarda temporizadores de visibilidade
const visibilidadeTimers = new Map();

const mediaObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    const el = entry.target;
    const isVideo = el.tagName === "VIDEO";
    const src = el.dataset.src;

    if (entry.isIntersecting) {
      // Espera 2 segundos de visibilidade antes de carregar
      const timer = setTimeout(() => {
        if (el.classList.contains("lazy-media") && src) {
          if (el.tagName === "IMG") {
            const realImg = new Image();
            realImg.src = src;
            realImg.onload = () => {
              el.src = src;
              el.classList.remove("lazy-media");
            };
          } else if (isVideo) {
            el.src = src;
            el.preload = "metadata";
            el.classList.remove("lazy-media");
            el.addEventListener("canplay", () => el.play().catch(() => {}), { once: true });
          }
        }

        // Controle: apenas um vídeo rodando por vez
        if (isVideo) {
          document.querySelectorAll("video.carousel-item").forEach(v => {
            if (v !== el && !v.paused) v.pause();
          });
          el.play().catch(() => {});
        }

        // Para de observar após carregar
        observer.unobserve(el);
        visibilidadeTimers.delete(el);
      }, 800); // 2 segundos

      visibilidadeTimers.set(el, timer);
    } else {
      // Saiu da tela antes de completar o tempo → cancela
      if (visibilidadeTimers.has(el)) {
        clearTimeout(visibilidadeTimers.get(el));
        visibilidadeTimers.delete(el);
      }

      // Pausa vídeos fora da tela
      if (isVideo && !el.paused) el.pause();
    }
  });
}, { rootMargin: "400px", threshold: 0.3 });

// Inicia observação
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

// ✅ Controle global do botão "voltar" (para todos os modais e menus)
window.addEventListener("popstate", () => {
  // Fecha modal de imagem
  const modalImagem = document.getElementById("modaldeimgdocard");
  if (modalImagem && modalImagem.style.display === "flex") {
    modalImagem.style.display = "none";
    document.querySelectorAll("#modaldeimgdocard video").forEach(v => v.pause());
    return;
  }

  // Fecha modal do carrinho
  const modalCarrinho = document.getElementById("modalCarrinho");
  if (modalCarrinho) {
    modalCarrinho.remove();
    document.body.style.overflow = "";
    return;
  }

  // Fecha modal "Sobre Nós" (se existir)
  const aboutModal = document.getElementById("aboutModal");
  if (aboutModal && aboutModal.style.display === "flex") {
    aboutModal.style.display = "none";
    return;
    
  }

  // Fecha menu lateral
  const menu = document.getElementById("menu");
  const hamburger = document.getElementById("hamburger");
  if (menu && menu.classList.contains("active")) {
    menu.classList.remove("active");
    hamburger.classList.remove("active");
    return;
  }
});


// 🔹 Permite selecionar o card com duplo clique
card.addEventListener("dblclick", (e) => {
  // Evita conflito com clique nas setas ou imagens do carrossel
  if (e.target.closest(".carousel-controls") || e.target.closest(".carousel-item")) return;

  const checkbox = card.querySelector(".select-produto");
  if (checkbox && !checkbox.disabled) {
    checkbox.checked = !checkbox.checked;
    card.classList.toggle("selected", checkbox.checked);

    if (checkbox.checked) {
      if (!carrinho.some(p => p.id === produto.id)) {
        carrinho.push(produto);
      }
    } else {
      carrinho = carrinho.filter(p => p.id !== produto.id);
    }

    btnCarrinho.style.display = carrinho.length > 0 ? "block" : "none";
  }
});


// Se o produto não estiver disponível, deixa o card visualmente “apagado”
if (!produto.disponibilidade) {
  card.style.opacity = "0.5";
  card.style.pointerEvents = "none"; // impede qualquer interação
}

card.appendChild(checkboxLabel);




    

    // ---- Adiciona elementos no card ----
    card.appendChild(carousel);
    card.appendChild(info);
    card.appendChild(checkboxLabel);
    catalogo.appendChild(card);

    // ---- Modal do card (imagem/video) ----









  // ---- Modal do card (imagem/video) ----
  // ===== MODAL DE IMAGEM / VÍDEO =====
const modalNavegacaoDoModalDoCard = document.createElement("div");
modalNavegacaoDoModalDoCard.id = "modaldeimgdocard";
modalNavegacaoDoModalDoCard.style.cssText = `
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.9);
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2000;
  overflow: hidden;
`;

const modalContentNavegacaoDoModalDoCard = document.createElement("div");
modalContentNavegacaoDoModalDoCard.style.cssText = `
  position: relative;
  max-width: 90%;
  max-height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const closeBtnNavegacaoDoModalDoCard = document.createElement("span");
closeBtnNavegacaoDoModalDoCard.innerHTML = "✕";
closeBtnNavegacaoDoModalDoCard.style.cssText = `
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 10;
`;

const navContainerNavegacaoDoModalDoCard = document.createElement("div");
navContainerNavegacaoDoModalDoCard.style.cssText = `
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
`;

function criarBotaoNavegacao(texto) {
  const btn = document.createElement("button");
  btn.innerHTML = texto;
  btn.style.cssText = `
    background: rgba(255,255,255,0.2);
    border: none;
    color: white;
    font-size: 24px;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s;
  `;
  btn.onmouseenter = () => (btn.style.background = "rgba(255,255,255,0.4)");
  btn.onmouseleave = () => (btn.style.background = "rgba(255,255,255,0.2)");
  return btn;
}

const prevBtnNavegacaoDoModalDoCard = criarBotaoNavegacao("◀");
const nextBtnNavegacaoDoModalDoCard = criarBotaoNavegacao("▶");

const counterNavegacaoDoModalDoCard = document.createElement("span");
counterNavegacaoDoModalDoCard.style.cssText = "color:white; font-size:16px;";

navContainerNavegacaoDoModalDoCard.append(
  prevBtnNavegacaoDoModalDoCard,
  counterNavegacaoDoModalDoCard,
  nextBtnNavegacaoDoModalDoCard
);

modalContentNavegacaoDoModalDoCard.append(closeBtnNavegacaoDoModalDoCard);
modalNavegacaoDoModalDoCard.append(
  modalContentNavegacaoDoModalDoCard,
  navContainerNavegacaoDoModalDoCard
);
document.body.appendChild(modalNavegacaoDoModalDoCard);

let modalIndexNavegacaoDoModalDoCard = 0;
let modalItemsNavegacaoDoModalDoCard = [];

// ---- Exibir item atual ----
function showModalItemNavegacaoDoModalDoCard(index) {
  modalContentNavegacaoDoModalDoCard
    .querySelectorAll("img, video")
    .forEach(el => {
      if (el.tagName === "VIDEO") el.pause();
      el.remove();
    });

  const item = modalItemsNavegacaoDoModalDoCard[index];
  if (!item) return;

  const clone = document.createElement(item.tagName.toLowerCase());
  clone.src = item.dataset.src || item.src;

  Object.assign(clone.style, {
    maxWidth: "100%",
    maxHeight: "80vh",
    borderRadius: "10px",
    transition: "opacity 0.3s ease"
  });

  if (item.tagName === "VIDEO") {
    Object.assign(clone, {
      muted: true,
      autoplay: true,
      loop: true,
      playsInline: true,
      controls: true
    });
  }

  modalContentNavegacaoDoModalDoCard.appendChild(clone);
  counterNavegacaoDoModalDoCard.textContent = `${index + 1} / ${modalItemsNavegacaoDoModalDoCard.length}`;
}

// ---- Abrir modal ----
items.forEach((item, i) => {
  item.addEventListener("click", () => {
    modalItemsNavegacaoDoModalDoCard = Array.from(items);
    modalIndexNavegacaoDoModalDoCard = i;
    modalNavegacaoDoModalDoCard.style.display = "flex";
    showModalItemNavegacaoDoModalDoCard(modalIndexNavegacaoDoModalDoCard);
    // Adiciona estado ao histórico para capturar o botão "voltar"
    history.pushState({ modalAberto: true }, '');

  });
});

// ---- Navegação ----
prevBtnNavegacaoDoModalDoCard.addEventListener("click", () => {
  modalIndexNavegacaoDoModalDoCard =
    (modalIndexNavegacaoDoModalDoCard - 1 + modalItemsNavegacaoDoModalDoCard.length) %
    modalItemsNavegacaoDoModalDoCard.length;
  showModalItemNavegacaoDoModalDoCard(modalIndexNavegacaoDoModalDoCard);
});

nextBtnNavegacaoDoModalDoCard.addEventListener("click", () => {
  modalIndexNavegacaoDoModalDoCard =
    (modalIndexNavegacaoDoModalDoCard + 1) % modalItemsNavegacaoDoModalDoCard.length;
  showModalItemNavegacaoDoModalDoCard(modalIndexNavegacaoDoModalDoCard);
});

// ---- Swipe ----
let startXNavegacaoDoModalDoCard = 0;
modalContentNavegacaoDoModalDoCard.addEventListener("mousedown", e => (startXNavegacaoDoModalDoCard = e.clientX));
modalContentNavegacaoDoModalDoCard.addEventListener("mouseup", e => {
  const diff = startXNavegacaoDoModalDoCard - e.clientX;
  if (Math.abs(diff) > 50) diff > 0 ? nextBtnNavegacaoDoModalDoCard.click() : prevBtnNavegacaoDoModalDoCard.click();
});

modalContentNavegacaoDoModalDoCard.addEventListener("touchstart", e => (startXNavegacaoDoModalDoCard = e.touches[0].clientX));
modalContentNavegacaoDoModalDoCard.addEventListener("touchend", e => {
  const diff = startXNavegacaoDoModalDoCard - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? nextBtnNavegacaoDoModalDoCard.click() : prevBtnNavegacaoDoModalDoCard.click();
});

// ---- Fechar modal ----
function fecharModalNavegacaoDoModalDoCard() {
  // ✅ volta o histórico se o modal estiver aberto
  if (history.state && history.state.modalAberto) {
    history.back();
  }

  modalNavegacaoDoModalDoCard.style.display = "none";
  modalContentNavegacaoDoModalDoCard.querySelectorAll("video").forEach(v => v.pause());
}


closeBtnNavegacaoDoModalDoCard.addEventListener("click", fecharModalNavegacaoDoModalDoCard);
modalNavegacaoDoModalDoCard.addEventListener("click", e => {
  if (e.target === modalNavegacaoDoModalDoCard) fecharModalNavegacaoDoModalDoCard();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") fecharModalNavegacaoDoModalDoCard();
});
// 🔙 Fecha o modal ao apertar o botão "voltar" do celular
window.addEventListener("popstate", () => {
  if (modalNavegacaoDoModalDoCard.style.display === "flex") {
    fecharModalNavegacaoDoModalDoCard();
  }
});



  // ---------------- Carrinho ----------------

  btnCarrinho.addEventListener("click", () => {
    if (carrinho.length === 0) return;
    history.pushState({ carrinhoAberto: true }, '');


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
      descricao.style.fontSize = "0.9rem";
      descricao.style.color = "#333";
      descricao.style.margin = "5px 0 0 0";
      descricao.style.display = "-webkit-box";
      descricao.style.WebkitLineClamp = "2";    
      descricao.style.WebkitBoxOrient = "vertical";
      descricao.style.overflow = "hidden";
      descricao.style.textOverflow = "ellipsis";
      descricao.style.lineHeight = "1.2em";
      descricao.style.maxHeight = "2.4em";     
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
  const produtosSelecionados = carrinho
    .map(p => `${p.titulo} - ${p.tamanho}`)
    .join("\n");

  // Define o texto com base na quantidade de itens
  const textoMandala = carrinho.length > 1
    ? "as mandalas"
    : "a mandala";

  const msg = `Olá! Gostaria de mais informações sobre ${textoMandala}:\n${produtosSelecionados}`;

  window.open(
    `https://wa.me/5547984694079?text=${encodeURIComponent(msg)}`,
    "_blank"
  );

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
  });





}
