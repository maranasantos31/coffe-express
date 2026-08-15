function atualizarPrecoCafe() {
    const base = parseFloat(document.getElementById("tamanho1").value) || 0;
    const torra = parseFloat(document.getElementById("torra1").value) || 0;
    const int = parseFloat(document.getElementById("inttorra1").value) || 0;
    const sabor = parseFloat(document.getElementById("sabor1").value) || 0;
    const tipoCafe = parseFloat(document.querySelector('input[name="tipoCafe1"]:checked')?.value || 0);

    const total = base + torra + int + sabor + tipoCafe;
    document.getElementById("preco-valor").textContent = `R$ ${total.toFixed(2)}`;
}

document.querySelectorAll("#torra1, #inttorra1, #sabor1, #tamanho1, input[name='tipoCafe1']")
    .forEach(e => e.addEventListener("change", atualizarPrecoCafe));


function atualizarPrecoLatte() {
    const base = parseFloat(document.getElementById("tamanho2").value) || 0;
    const torra = parseFloat(document.getElementById("torra2").value) || 0;
    const int = parseFloat(document.getElementById("inttorra2").value) || 0;
    const sabor = parseFloat(document.getElementById("sabor2").value) || 0;
    const leite = parseFloat(document.querySelector('input[name="tipoLeite2"]:checked')?.value || 0);
    const tipoCafe = parseFloat(document.querySelector('input[name="tipoCafe2"]:checked')?.value || 0);

    const total = base + torra + int + sabor + leite + tipoCafe;
    document.getElementById("preco-valor2").textContent = `R$ ${total.toFixed(2)}`;
}

document.querySelectorAll("#torra2, #inttorra2, #sabor2, #tamanho2, input[name='tipoLeite2'], input[name='tipoCafe2']")
    .forEach(e => e.addEventListener("change", atualizarPrecoLatte));


function atualizarPrecoGelado() {
    const base = parseFloat(document.getElementById("tamanho3").value) || 0;
    const torra = parseFloat(document.getElementById("torra3").value) || 0;
    const int = parseFloat(document.getElementById("inttorra3").value) || 0;
    const sabor = parseFloat(document.getElementById("sabor3").value) || 0;
    const leite = parseFloat(document.querySelector('input[name="tipoLeite3"]:checked')?.value || 0);
    const tipoCafe = parseFloat(document.querySelector('input[name="tipoCafe3"]:checked')?.value || 0);

    const total = base + torra + int + sabor + leite + tipoCafe;
    document.getElementById("preco-valor3").textContent = `R$ ${total.toFixed(2)}`;
}

document.querySelectorAll("#torra3, #inttorra3, #sabor3, #tamanho3, input[name='tipoLeite3'], input[name='tipoCafe3']")
    .forEach(e => e.addEventListener("change", atualizarPrecoGelado));


function atualizarPrecoSalgado() {
    const tipo = parseFloat(document.getElementById("tipoSalgado").value) || 0;
    const tamanho = parseFloat(document.getElementById("tamanhoSalgado").value) || 0;
    const total = tipo + tamanho;

    document.getElementById("preco-salgado").textContent = `R$ ${total.toFixed(2)}`;
}

document.querySelectorAll("#tipoSalgado, #tamanhoSalgado")
    .forEach(e => e.addEventListener("change", atualizarPrecoSalgado));

document.querySelectorAll("#tipoSalgado, #tamanhoSalgado")
    .forEach(e => e.addEventListener("change", atualizarPrecoSalgado));



let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    alert(`${nome} adicionado ao carrinho!`);
    console.log("Carrinho:", carrinho);
}

document.addEventListener('DOMContentLoaded', () => {
    const imgSanduiche = document.getElementById('img-sanduiche');
    const tipoPao = document.getElementById('tipoPao');
    const saladas = document.querySelectorAll('input[name="salada"]');
    const molho = document.getElementById('molho');
    const tamanho = document.getElementById('tamanhoSanduiche');
    const precoSpan = document.getElementById('preco-sanduiche');
    const btn = document.getElementById('btnAdicionarSanduiche');

    const precoBase = 5.00;

    function atualizarPreco() {
        let total = precoBase;

        const valorPao = parseFloat(tipoPao.value || 0);
        const valorMolho = parseFloat(molho.value || 0);
        const valorTamanho = parseFloat(tamanho.value || 0);

  
        let totalSaladas = 0;
        saladas.forEach(salada => {
            if (salada.checked) {
                totalSaladas += parseFloat(salada.value);
            }
        });

        total += valorPao + valorMolho + valorTamanho + totalSaladas;
        precoSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    tipoPao.addEventListener('change', atualizarPreco);
    saladas.forEach(salada => salada.addEventListener('change', atualizarPreco));
    molho.addEventListener('change', atualizarPreco);
    tamanho.addEventListener('change', atualizarPreco);

    btn.addEventListener('click', () => {
        if (!tipoPao.value || !molho.value) {
            alert("Por favor, selecione o tipo de pão e o molho para montar seu sanduíche!");
            return;
        }

        const saladasSelecionadas = Array.from(saladas)
            .filter(salada => salada.checked)
            .map(salada => salada.nextSibling.textContent.trim())
            .join(', ') || 'Sem salada';

        const produto = {
            id: 'sanduiche-' + Date.now(),
            nome: "Sanduíche",
            pao: tipoPao.options[tipoPao.selectedIndex].text,
            saladas: saladasSelecionadas,
            molho: molho.options[molho.selectedIndex].text,
            tamanho: tamanho.options[tamanho.selectedIndex].text,
            preco: precoSpan.textContent,
            imagem: imgSanduiche.src,
            quantidade: 1
        };

        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        alert(`Sanduíche adicionado ao carrinho por ${produto.preco}!`);
    });
});


document.getElementById("btnAdicionarSalgado")?.addEventListener("click", () => {
    const precoTexto = document.getElementById("preco-salgado").textContent.replace("R$", "").trim();
    const preco = parseFloat(precoTexto);
    const tipo = document.getElementById("tipoSalgado");
    const nomeSalgado = tipo.options[tipo.selectedIndex]?.text || "Salgado";

    if (!isNaN(preco) && preco > 0) {
        adicionarAoCarrinho(nomeSalgado, preco);
    } else {
        alert("Escolha o tipo e o tamanho do salgado antes de adicionar ao carrinho!");
    }
});
