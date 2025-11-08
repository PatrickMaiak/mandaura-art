document.addEventListener("DOMContentLoaded", () => {
  const animacaoContainer = document.querySelector(".animacaoContainerAnimacao");
  const intro = document.querySelector(".introAnimacao");
  const bemvindo = document.querySelector(".bemvindoAnimacao");
  const logoExpand = document.querySelector(".logoExpandAnimacao");
  const body = document.body;

  // Bloqueia scroll
  body.classList.add("animacaoAtivaAnimacao");

  // 1️⃣ Letras do logo aparecem
  setTimeout(() => {
    intro.classList.add("fadeOutAnimacao");

    // 2️⃣ Mostra a mensagem de bem-vindo
    setTimeout(() => {
      intro.style.display = "none";
      bemvindo.style.display = "block";
    }, 900); // fade-out do intro
  }, 1100); // tempo para as letras aparecerem

  // 3️⃣ Mantém a mensagem de bem-vindo mais tempo antes da logo expandir
  setTimeout(() => {
    bemvindo.style.display = "none";
    logoExpand.style.display = "block";

    // 4️⃣ Quando a logo termina de expandir, remove animação e mostra o site
    setTimeout(() => {
      logoExpand.style.display = "none";
      animacaoContainer.style.display = "none";

      // Libera scroll
      body.classList.remove("animacaoAtivaAnimacao");
    }, 5000); // duração da logo expandida
  }, 5200); // aumenta o delay da bem-vindo (antes era 6500)
});
