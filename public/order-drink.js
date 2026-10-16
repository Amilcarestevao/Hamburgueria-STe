const dialogPedido = document.createElement("dialog");
dialogPedido.className = "pedido-dialog";
dialogPedido.innerHTML = `
    <form id="form-pedido">
        <span class="pedido-dialog-etiqueta">Seu pedido</span>
        <h2>Escolha um refrigerante</h2>
        <p id="comida-selecionada" class="pedido-dialog-comida"></p>
        <fieldset class="bebidas-opcoes">
            <legend>Bebida</legend>
            ${["Sprite", "Coca-Cola", "Coca-Cola em garrafa", "Sumol", "Sumol em garrafa", "Booster", "Smirnoff", "Speed", "Pepsi", "7up", "Astro", "Compal", "Água", "Nenhuma bebida"].map((bebida) => {
                const icone = bebida === "Água" ? "water_drop" : bebida === "Nenhuma bebida" ? "do_not_disturb_on" : "local_drink";
                const classe = bebida === "Nenhuma bebida" ? " bebida-sem" : "";
                return `<label class="bebida-opcao${classe}"><input type="radio" name="bebida" value="${bebida}" required><span class="material-symbols-outlined" aria-hidden="true">${icone}</span><span>${bebida}</span></label>`;
            }).join("")}
        </fieldset>
        <div class="pedido-dialog-acoes">
            <button class="dialog-cancelar" type="button">Cancelar</button>
            <button class="dialog-confirmar" type="submit" disabled>Enviar pelo WhatsApp</button>
        </div>
    </form>
`;
document.body.append(dialogPedido);

const formularioPedido = dialogPedido.querySelector("form");
const comidaSelecionada = dialogPedido.querySelector("#comida-selecionada");
const botaoEnviarPedido = dialogPedido.querySelector("[type='submit']");
let comidaDoPedido = "";

document.addEventListener("click", (evento) => {
    if (!(evento.target instanceof Element)) return;
    const pedido = evento.target.closest(".pedido");
    const nomeProduto = pedido?.closest(".card-burguer")?.querySelector("h2")?.textContent.trim();
    if (!pedido || !nomeProduto) return;

    evento.preventDefault();
    comidaDoPedido = nomeProduto;
    comidaSelecionada.textContent = comidaDoPedido;
    formularioPedido.reset();
    botaoEnviarPedido.disabled = true;
    dialogPedido.showModal();
});

dialogPedido.querySelector(".dialog-cancelar").addEventListener("click", () => {
    dialogPedido.close();
});

formularioPedido.addEventListener("change", (evento) => {
    if (evento.target.name === "bebida") {
        botaoEnviarPedido.disabled = !formularioPedido.querySelector("input[name='bebida']:checked");
    }
});

formularioPedido.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const bebida = formularioPedido.querySelector("input[name='bebida']:checked")?.value;
    if (!bebida) return;

    const mensagem = bebida === "Nenhuma bebida"
        ? `Olá! Eu gostaria de ${comidaDoPedido} sem bebida.`
        : `Olá! Eu gostaria de ${comidaDoPedido} com ${bebida}.`;
    const urlWhatsApp = `https://wa.me/244934230757?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
    dialogPedido.close();
});
