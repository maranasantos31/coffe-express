
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


function adicionarAoCarrinho(id, nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    alert("Produto adicionado ao carrinho!");
}


function carregarCarrinho() {
    const container = document.getElementById("lista-carrinho");
    const totalElement = document.getElementById("total");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item-carrinho");

        div.innerHTML = `
            <img src="${item.imagem}" class="img-item">
            <div class="info">
                <h3>${item.nome}</h3>
                <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <button onclick="removerItem(${item.id})" class="remover">Remover</button>
            </div>
        `;

        container.appendChild(div);

        total += item.preco * item.quantidade;
    });

    totalElement.innerText = "R$ " + total.toFixed(2);
}


function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
    carregarCarrinho();
}


function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    carregarCarrinho();
}


document.querySelectorAll(".btn-comprar").forEach(botao => {
    botao.addEventListener("click", () => {
        const id = parseInt(botao.dataset.id);
        const nome = botao.dataset.nome;
        const preco = parseFloat(botao.dataset.preco);
        const imagem = botao.dataset.img;

        adicionarAoCarrinho(id, nome, preco, imagem);
    });
});
