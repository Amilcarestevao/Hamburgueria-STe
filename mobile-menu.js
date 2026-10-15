document.querySelectorAll(".mobile-menu-toggle").forEach((button) => {
    const menu = button.closest("nav")?.querySelector("ul");
    if (!menu) return;

    const rotulosMenu = () => {
        const idioma = document.documentElement.lang;
        if (idioma === "en") return { abrir: "Open menu", fechar: "Close menu" };
        if (idioma === "es") return { abrir: "Abrir menú", fechar: "Cerrar menú" };
        return { abrir: "Abrir menu", fechar: "Fechar menu" };
    };

    const fecharMenu = () => {
        const rotulos = rotulosMenu();
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", rotulos.abrir);
        button.querySelector(".material-symbols-outlined").textContent = "menu";
        menu.classList.remove("is-open");
    };

    button.addEventListener("click", () => {
        const aberto = button.getAttribute("aria-expanded") === "true";
        if (aberto) {
            fecharMenu();
            return;
        }

        const rotulos = rotulosMenu();
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-label", rotulos.fechar);
        button.querySelector(".material-symbols-outlined").textContent = "close";
        menu.classList.add("is-open");
    });

    menu.addEventListener("click", (evento) => {
        if (evento.target.closest("a")) fecharMenu();
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") fecharMenu();
    });
});
