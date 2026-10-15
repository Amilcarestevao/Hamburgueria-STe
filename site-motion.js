const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const gruposAnimados = document.querySelectorAll(
    "main .Hamburgueres, main .lista-bebidas, main .pagina-contacto, main .pagina-fatos, main .mac-steps"
);

gruposAnimados.forEach((grupo) => {
    Array.from(grupo.children).forEach((item, indice) => {
        if (!item.matches(".card-burguer, .bebida-item, .contato-item, .pagina-fatos article, .mac-steps article")) return;

        item.dataset.reveal = "";
        item.style.setProperty("--reveal-delay", `${(indice % 4) * 75}ms`);
    });
});

const elementosAnimados = document.querySelectorAll("[data-reveal]");

if (movimentoReduzido || !("IntersectionObserver" in window)) {
    elementosAnimados.forEach((elemento) => elemento.classList.add("is-visible"));
} else {
    document.body.classList.add("reveal-enabled");
    const observador = new IntersectionObserver((entradas, instancia) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("is-visible");
                instancia.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });

    elementosAnimados.forEach((elemento) => observador.observe(elemento));
}
