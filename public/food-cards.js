const detalhesProdutos = new Map([
    ["X-Burguer", { etiqueta: "MAIS PEDIDO", descricao: "Queijo, salada fresca e batatas crocantes." }],
    ["MacZinh", { etiqueta: "DA CASA", descricao: "Hambúrguer suculento com bacon e batatas para acompanhar." }],
    ["Maczão", { etiqueta: "MAIS PEDIDO", descricao: "Pão com gergelim, queijo derretido e salada fresca." }],
    ["X-STe", { etiqueta: "ASSINATURA", descricao: "Um hambúrguer caprichado para matar a fome." }],
    ["Duplo X-Burguer", { etiqueta: "DUPLO", descricao: "Dois hambúrgueres, queijo e muito sabor." }],
    ["Hambúrguer Simples", { etiqueta: "CLÁSSICO", descricao: "O sabor clássico da casa, preparado na hora." }],
    ["Sanduíche Simples", { etiqueta: "SANDUÍCHE", descricao: "Uma opção simples e preparada na hora." }],
    ["Sanduíche de Carne", { etiqueta: "SANDUÍCHE", descricao: "Carne saborosa num sanduíche feito na hora." }],
    ["O Trio", { etiqueta: "DA CASA", descricao: "Uma combinação generosa da casa." }],
    ["Sanduíche de Ovo e Salsicha", { etiqueta: "SANDUÍCHE", descricao: "Ovo e salsicha num sanduíche preparado na hora." }],
    ["Misto Quente", { etiqueta: "SANDUÍCHE", descricao: "Pão tostado com queijo derretido." }],
    ["Batatas fritas e salsicha", { etiqueta: "COMBO", descricao: "Batatas fritas e salsicha para partilhar." }],
    ["Combo X-Burguer", { etiqueta: "MAIS PEDIDO", descricao: "O clássico da casa com acompanhamento." }],
    ["X-Burguer + batatas", { etiqueta: "COMBO", descricao: "X-Burguer acompanhado de batatas fritas." }],
    ["X-Burguer Duplo + batatas", { etiqueta: "COMBO", descricao: "X-Burguer duplo acompanhado de batatas." }],
    ["Doze de Batatas", { etiqueta: "ACOMPANHAMENTO", descricao: "Batatas fritas crocantes para acompanhar." }],
    ["Rissóis e croquetes", { etiqueta: "ACOMPANHAMENTO", descricao: "Salgados da casa, servidos quentes." }]
]);

if (!document.body.classList.contains("home-page")) {
    document.querySelectorAll(".card-burguer").forEach((card) => {
        const titulo = card.querySelector("h2");
        const imagem = card.querySelector(":scope > img");
        const preco = card.querySelector(":scope > p");
        const pedido = card.querySelector(":scope > .pedido");
        if (!titulo || !imagem || !preco || !pedido) return;

        const detalhes = detalhesProdutos.get(titulo.textContent.trim()) || {
            etiqueta: "DA CASA",
            descricao: "Preparado na hora com o sabor da Hamburgueria STe."
        };
        const moldura = document.createElement("div");
        moldura.className = "food-card-image";
        const etiqueta = document.createElement("span");
        etiqueta.className = "food-card-badge";
        etiqueta.textContent = detalhes.etiqueta;
        imagem.parentNode.insertBefore(moldura, imagem);
        moldura.append(imagem, etiqueta);

        const descricao = document.createElement("p");
        descricao.className = "food-card-description";
        descricao.textContent = detalhes.descricao;
        titulo.insertAdjacentElement("afterend", descricao);

        preco.className = "food-card-price";
        const metadados = document.createElement("div");
        metadados.className = "food-card-meta";
        const preparo = document.createElement("span");
        preparo.className = "food-card-preparo";
        const icone = document.createElement("span");
        icone.className = "material-symbols-outlined";
        icone.setAttribute("aria-hidden", "true");
        icone.textContent = "schedule";
        const textoPreparo = document.createElement("span");
        textoPreparo.textContent = "Feito na hora";
        preparo.append(icone, textoPreparo);
        metadados.append(preparo, preco);
        pedido.before(metadados);
    });
}
