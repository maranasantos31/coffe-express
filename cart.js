const CART_KEY = "cafeteriaExpressCarrinho";

function getCarrinho() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(CART_KEY, JSON.stringify(carrinho));
    atualizarBadgeCarrinho();
}

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function adicionarAoCarrinho(item) {
    const carrinho = getCarrinho();
    carrinho.push(item);
    salvarCarrinho(carrinho);
    mostrarToast(`${item.nome} adicionado ao carrinho ✓`);
    if (typeof renderizarCarrinho === "function") {
        renderizarCarrinho();
    }
}

function removerDoCarrinho(index) {
    const carrinho = getCarrinho();
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    if (typeof renderizarCarrinho === "function") {
        renderizarCarrinho();
    }
}

function limparCarrinho() {
    if (getCarrinho().length === 0) return;
    if (!confirm("Tem certeza que deseja esvaziar o carrinho?")) return;
    localStorage.removeItem(CART_KEY);
    atualizarBadgeCarrinho();
    if (typeof renderizarCarrinho === "function") {
        renderizarCarrinho();
    }
    mostrarToast("Carrinho esvaziado.");
}

function atualizarBadgeCarrinho() {
    const badge = document.getElementById("cart-badge");
    if (!badge) return;
    const total = getCarrinho().length;
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
}

function mostrarToast(mensagem) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }
    toast.textContent = mensagem;
    toast.classList.add("show");
    clearTimeout(toast._timeoutId);
    toast._timeoutId = setTimeout(() => toast.classList.remove("show"), 2500);
}

function configurarProduto({ nome, imagem, precoBase = 0, selectIds = [], radioNames = [], displayId, addBtnId }) {
    const selects = selectIds.map(id => document.getElementById(id)).filter(Boolean);
    const displaySpan = displayId ? document.getElementById(displayId) : null;
    const addBtn = addBtnId ? document.getElementById(addBtnId) : null;

    function calcular() {
        let total = precoBase;
        let detalhes = [];
        let completo = true;

        selects.forEach(sel => {
            const opt = sel.options[sel.selectedIndex];
            if (!opt || sel.value === "" || opt.disabled) {
                completo = false;
            } else {
                total += Number(sel.value) || 0;
                detalhes.push(opt.textContent.trim());
            }
        });

        radioNames.forEach(name => {
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            if (checked) {
                total += Number(checked.value) || 0;
            }
        });

        if (displaySpan) {
            displaySpan.textContent = `R$ ${formatarPreco(total)}`;
        }

        return { total, detalhes, completo };
    }

    selects.forEach(sel => sel.addEventListener("change", calcular));
    radioNames.forEach(name => {
        document.querySelectorAll(`input[name="${name}"]`).forEach(r => r.addEventListener("change", calcular));
    });

    if (addBtn) {
        addBtn.addEventListener("click", () => {
            const { total, detalhes, completo } = calcular();
            if (selects.length > 0 && !completo) {
                mostrarToast("Selecione todas as opções antes de adicionar!");
                return;
            }
            adicionarAoCarrinho({
                nome,
                preco: Number(total.toFixed(2)),
                detalhes: detalhes.join(" · "),
                imagem: imagem || ""
            });
        });
    }

    calcular();
}

function configurarProdutoFixo({ nome, preco, imagem, addBtnId }) {
    const addBtn = document.getElementById(addBtnId);
    if (!addBtn) return;
    addBtn.addEventListener("click", () => {
        adicionarAoCarrinho({ nome, preco, detalhes: "", imagem: imagem || "" });
    });
}

document.addEventListener("DOMContentLoaded", atualizarBadgeCarrinho);
