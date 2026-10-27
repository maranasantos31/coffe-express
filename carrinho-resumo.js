document.addEventListener("DOMContentLoaded", function () {
    renderizarCarrinho();

    const btnLimpar = document.getElementById("limparCarrinho");
    if (btnLimpar) {
        btnLimpar.addEventListener("click", limparCarrinho);
    }

    const btnFinalizar = document.getElementById("finalizarCarrinho");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", function () {
            if (getCarrinho().length === 0) {
                mostrarToast("Seu carrinho está vazio.");
                return;
            }
            mostrarToast("Pedido enviado! Obrigado pela preferência ☕");
        });
    }
});

function renderizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const totalTxt = document.getElementById("total");
    if (!lista || !totalTxt) return;

    const carrinho = getCarrinho();
    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio. <a href="carrinho.html">Confira o cardápio</a> e adicione seus itens favoritos!</p>';
    }

    let total = 0;

    carrinho.forEach((item, index) => {
        total += Number(item.preco) || 0;

        const div = document.createElement("div");
        div.classList.add("item-carrinho");
        div.innerHTML = `
            <div class="item-carrinho-info">
                <p class="item-nome">${item.nome}</p>
                ${item.detalhes ? `<p class="item-detalhes">${item.detalhes}</p>` : ""}
                <p class="item-preco">R$ ${formatarPreco(item.preco)}</p>
            </div>
            <button class="btn-remover" onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        lista.appendChild(div);
    });

    totalTxt.textContent = formatarPreco(total);
}
