document.addEventListener("DOMContentLoaded", function () {

    configurarProdutoFixo({
        nome: "Torrador de café",
        preco: 670.99,
        imagem: "https://ecommerce.vtexassets.com/arquivos/ids/155702-800-1082?v=638119028423030000&width=800&height=1082&aspect=true",
        addBtnId: "btnAdicionar1"
    });

    configurarProdutoFixo({
        nome: "Balança Dosadora Pressca",
        preco: 29.99,
        imagem: "https://ecommerce.vtexassets.com/arquivos/ids/155647-800-1082?v=638116519564430000&width=800&height=1082&aspect=true",
        addBtnId: "btnAdicionar1-2"
    });

    configurarProduto({
        nome: "Torra Arábica (grãos)",
        imagem: "https://ecommerce.vtexassets.com/arquivos/ids/155675-800-1082?v=638118862504030000&width=800&height=1082&aspect=true",
        selectIds: ["torra2", "intorra2"],
        displayId: "preco-valor2",
        addBtnId: "btnAdicionar2"
    });

    configurarProdutoFixo({
        nome: "Kit Presente Grão e Moedor",
        preco: 412.20,
        imagem: "https://ecommerce.vtexassets.com/arquivos/ids/156147-800-1082?v=638260664191070000&width=800&height=1082&aspect=true",
        addBtnId: "btnAdicionar3"
    });

    configurarProdutoFixo({
        nome: "Kit Drip Coffee + Caneca Orfeu",
        preco: 120.20,
        imagem: "https://ecommerce.vtexassets.com/arquivos/ids/155706-800-1082?v=638119036213270000&width=800&height=1082&aspect=true",
        addBtnId: "btnAdicionar3-2"
    });

    configurarProdutoFixo({
        nome: "Kit Presente Grão Clássico + Moedor",
        preco: 438.33,
        imagem: "https://ecommerce.vtexassets.com/arquivos/ids/156273-800-1082?v=638441379623600000&width=800&height=1082&aspect=true",
        addBtnId: "btnAdicionar3-3"
    });

    configurarProduto({
        nome: "Cápsulas de Café Nespresso",
        imagem: "https://i.pinimg.com/736x/76/9f/a9/769fa989979f74f078daa351ef1a2885.jpg",
        selectIds: ["sabor3", "quantidade3"],
        displayId: "preco-valor3",
        addBtnId: "btnAdicionar4"
    });
});
