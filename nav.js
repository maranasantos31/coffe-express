document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("menu-principal");

    // Ano atual no rodapé
    document.querySelectorAll("[data-ano]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    if (!toggle || !menu) return;

    // Fundo escuro atrás do menu lateral
    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);

    function definirMenu(aberto) {
        menu.classList.toggle("aberto", aberto);
        toggle.classList.toggle("ativo", aberto);
        overlay.classList.toggle("visivel", aberto);
        document.body.classList.toggle("menu-aberto", aberto);
        toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
        toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    }

    toggle.addEventListener("click", function () {
        definirMenu(!menu.classList.contains("aberto"));
    });

    overlay.addEventListener("click", function () {
        definirMenu(false);
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            definirMenu(false);
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") definirMenu(false);
    });

    // Se a tela for ampliada com o menu aberto, fecha
    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) definirMenu(false);
    });
});
