
function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
}


document.getElementById("btnAdicionar1").addEventListener("click", () => {
    adicionarAoCarrinho({
        nome: "Torrador de café",
        preco: 670.99,
        quantidade: 1
    });
});


document.getElementById("btnAdicionar1-2").addEventListener("click", () => {
    adicionarAoCarrinho({
        nome: "Balança Dosadora Pressca",
        preco: 29.99,
        quantidade: 1
    });
});


const torraSelect = document.getElementById("torra2");
const tamanhoSelect = document.getElementById("intorra2");
const precoSpan = document.getElementById("preco-valor2");

function atualizarPrecoTorra() {
    const precoTorra = Number(torraSelect.value || 0);
    const precoTamanho = Number(tamanhoSelect.value || 0);
    const precoFinal = precoTorra + precoTamanho;

    precoSpan.textContent = `R$ ${precoFinal.toFixed(2)}`;
}

torraSelect.addEventListener("change", atualizarPrecoTorra);
tamanhoSelect.addEventListener("change", atualizarPrecoTorra);

document.getElementById("btnAdicionar2").addEventListener("click", () => {

    const preco = Number(torraSelect.value || 0) + Number(tamanhoSelect.value || 0);

    if (!torraSelect.value || !tamanhoSelect.value) {
        alert("Selecione torra e tamanho!");
        return;
    }

    adicionarAoCarrinho({
        nome: "Torra Arábica",
        preco: preco,
        torra: torraSelect.options[torraSelect.selectedIndex].textContent,
        tamanho: tamanhoSelect.options[tamanhoSelect.selectedIndex].textContent,
        quantidade: 1
    });
});

document.getElementById("btnAdicionar3").addEventListener("click", () => {
    adicionarAoCarrinho({
        nome: "Kit Presente Grão e Moedor",
        preco: 412.20,
        quantidade: 1
    });
});



// =========================
// PRODUTO 5 - DRIP COFFEE + CANECA
// =========================
document.getElementById("btnAdicionar3-2").addEventListener("click", () => {
    adicionarAoCarrinho({
        nome: "Kit Drip Coffee + Caneca Orfeu",
        preco: 120.20,
        quantidade: 1
    });
});



// =========================
// PRODUTO 6 - KIT CLÁSSICO + MOEDOR
// =========================
document.getElementById("btnAdicionar3-3").addEventListener("click", () => {
    adicionarAoCarrinho({
        nome: "Kit Presente Grão Clássico + Moedor",
        preco: 438.33,
        quantidade: 1
    });
});
