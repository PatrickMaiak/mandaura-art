// intro.js
document.addEventListener("DOMContentLoaded", () => {
  const animacaoContainer = document.querySelector(".animacaoContainerAnimacao");
  const intro       = document.querySelector(".introAnimacao");
  const bemvindo    = document.querySelector(".bemvindoAnimacao");
  const logoExpand  = document.querySelector(".logoExpandAnimacao");
  const body        = document.body;

  const animacaoJaRodou = sessionStorage.getItem("animacaoRodou");

  // 👉 Se a animação já rodou nesta aba, não roda de novo
  if (animacaoJaRodou) {
    if (animacaoContainer) animacaoContainer.style.display = "none";
    body.classList.remove("animacaoAtivaAnimacao");
    return; // sai daqui, não programa nenhum setTimeout
  }

  // 👇 Primeira vez na aba → roda a animação normalmente
  body.classList.add("animacaoAtivaAnimacao");

  // 1) Letras do logo aparecem
  setTimeout(() => {
    if (!intro) return;
    intro.classList.add("fadeOutAnimacao");

    // 2) Mostra a mensagem de bem-vindo
    setTimeout(() => {
      if (!intro || !bemvindo) return;
      intro.style.display = "none";
      bemvindo.style.display = "block";
    }, 900); // fade-out do intro
  }, 1100); // tempo para as letras aparecerem

  // 3) Mostra bem-vindo por um tempo e depois a logo expandida
  setTimeout(() => {
    if (!bemvindo || !logoExpand) return;

    bemvindo.style.display = "none";
    logoExpand.style.display = "block";

    // 4) Final da animação → esconde tudo, libera o site e marca que já rodou
    setTimeout(() => {
      logoExpand.style.display = "none";
      if (animacaoContainer) animacaoContainer.style.display = "none";
      body.classList.remove("animacaoAtivaAnimacao");
      sessionStorage.setItem("animacaoRodou", "true"); // ✅ marca que já rodou
    }, 0);
  }, 5200);
});
