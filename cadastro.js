document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-cadastro");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Cadastro realizado com sucesso! Redirecionando para login...");

 
        window.location.href = "login.html";
    });

    const cepInput = document.getElementById("cep");
    cepInput.addEventListener("input", function () {
        let valor = cepInput.value.replace(/\D/g, "");
        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
        }
        cepInput.value = valor;
    });

    cepInput.addEventListener("blur", function () {
        const cep = cepInput.value.replace(/\D/g, "");
        if (/^\d{8}$/.test(cep)) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => res.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById("endereco").value = data.logradouro || "";
                        document.getElementById("bairro").value = data.bairro || "";
                        document.getElementById("cidade").value = data.localidade || "";
                        document.getElementById("estado").value = data.uf || "";
                    } else {
                        alert("CEP não encontrado!");
                        limparCampos();
                    }
                })
                .catch(() => alert("Erro ao buscar o CEP. Tente novamente."));
        } else if (cep.length > 0) {
            alert("CEP inválido! Digite 8 números.");
            limparCampos();
        }
    });

    function limparCampos() {
        document.getElementById("endereco").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("estado").value = "";
    }
});
