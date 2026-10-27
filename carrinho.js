document.addEventListener("DOMContentLoaded", function () {

    configurarProduto({
        nome: "Café Expresso",
        imagem: "https://i.pinimg.com/736x/4d/ee/81/4dee81f6a2a2453e061e9352c62f8b78.jpg",
        selectIds: ["torraex", "inttorraex", "saborex", "tamanhoex"],
        radioNames: ["cafeex"],
        displayId: "preco-valor",
        addBtnId: "btnAdicionarex"
    });

    configurarProduto({
        nome: "Latte",
        imagem: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
        selectIds: ["torralat", "inttorralat", "saborlat", "tamanholat"],
        radioNames: ["leitelat", "caflat"],
        displayId: "preco-valorlat",
        addBtnId: "btnAdicionarlat"
    });

    configurarProduto({
        nome: "Gelado",
        imagem: "https://i.pinimg.com/736x/13/77/b2/1377b2ab9ab592ba8b2fa8a3f724e16e.jpg",
        selectIds: ["torrage", "inttorrage", "saborge", "tamanhoge"],
        radioNames: ["tipoLeitege", "tipoCafege"],
        displayId: "preco-valorge",
        addBtnId: "btnAdicionarge"
    });

    configurarProduto({
        nome: "Bolo",
        imagem: "https://i.pinimg.com/1200x/a6/b5/e8/a6b5e810163076331fd055cd9019ac24.jpg",
        selectIds: ["tipobl", "saborbl", "saborRecheiobl"],
        displayId: "preco-bl",
        addBtnId: "btnAdicionarbl"
    });

    configurarProduto({
        nome: "Torta Trançada",
        imagem: "https://i.pinimg.com/1200x/2a/70/06/2a70069e1044bd80da06bef5e12cb026.jpg",
        selectIds: ["tipotr", "sabortr", "saborRecheiotr"],
        displayId: "preco-tr",
        addBtnId: "btnAdicionartr"
    });

    configurarProduto({
        nome: "Croissant Doce",
        imagem: "https://i.pinimg.com/736x/73/cd/d0/73cdd08550b1f203d8c188bc931e4ad9.jpg",
        selectIds: ["recheiocr", "tamanhocr"],
        displayId: "preco-cr",
        addBtnId: "btnAdicionarcr"
    });

    configurarProduto({
        nome: "Brigadeiro",
        imagem: "https://i.pinimg.com/736x/d2/3c/7c/d23c7c987ca29f659be9ecd530677fe8.jpg",
        selectIds: ["tipobr", "tamanhobr"],
        displayId: "preco-br",
        addBtnId: "btnAdicionarbr"
    });

    configurarProduto({
        nome: "Bombinhas e Carolinas",
        imagem: "https://i.pinimg.com/736x/0f/c3/77/0fc377a2e4ae242dd5c2e7419360b792.jpg",
        selectIds: ["saborBombinha", "quantidadeBombinha"],
        displayId: "preco-bombinha",
        addBtnId: "btnAdicionarBombinha"
    });

    configurarProduto({
        nome: "Coxinha e Cia.",
        imagem: "https://i.pinimg.com/736x/55/dd/ed/55ddedc4b96814916b7e68476dab6661.jpg",
        selectIds: ["tipocx", "tamanhocx"],
        displayId: "preco-cx",
        addBtnId: "btnAdicionarcx"
    });

    configurarProduto({
        nome: "Torta Salgada",
        imagem: "https://i.pinimg.com/1200x/1f/c6/d2/1fc6d2b8c6cb0a0a6b3ee3e6d587dc5a.jpg",
        selectIds: ["tipoTorta", "saborTorta"],
        displayId: "preco-torta",
        addBtnId: "btnAdicionarTorta"
    });

    configurarProduto({
        nome: "Pastel de Forno",
        imagem: "https://i.pinimg.com/736x/aa/5e/1a/aa5e1acd3119c095a5bb45037f6a327e.jpg",
        selectIds: ["tipoPastel", "tamanhoPastel"],
        displayId: "preco-pastel",
        addBtnId: "btnAdicionarPastel"
    });

    (function configurarSanduiche() {
        const pao = document.getElementById("tipopao");
        const proteina = document.getElementById("tipopro");
        const molho = document.getElementById("molho");
        const tamanho = document.getElementById("tamanhoSanduiche");
        const display = document.getElementById("preco-sanduiche");
        const addBtn = document.getElementById("btnAdicionarSanduiche");
        const selects = [pao, proteina, molho, tamanho];

        function calcular() {
            let total = 0;
            let completo = true;
            let detalhes = [];

            selects.forEach(sel => {
                const opt = sel.options[sel.selectedIndex];
                if (!opt || sel.value === "" || opt.disabled) {
                    completo = false;
                } else {
                    total += Number(sel.value) || 0;
                    detalhes.push(opt.textContent.trim());
                }
            });

            display.textContent = `R$ ${formatarPreco(total)}`;
            return { total, completo, detalhes };
        }

        selects.forEach(sel => sel.addEventListener("change", calcular));

        addBtn.addEventListener("click", () => {
            const { total, completo, detalhes } = calcular();
            if (!completo) {
                mostrarToast("Selecione todas as opções antes de adicionar!");
                return;
            }
            const saladas = Array.from(document.querySelectorAll('input[name="salada"]:checked'))
                .map(cb => cb.value);
            if (saladas.length > 0) {
                detalhes.push("Saladas: " + saladas.join(", "));
            }
            adicionarAoCarrinho({
                nome: "Sanduíche",
                preco: Number(total.toFixed(2)),
                detalhes: detalhes.join(" · "),
                imagem: "https://i.pinimg.com/736x/36/6e/70/366e7067e4c25fb2cf0bd1a9261b9078.jpg"
            });
        });

        calcular();
    })();
});
