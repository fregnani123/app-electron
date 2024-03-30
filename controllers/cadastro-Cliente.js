document.addEventListener('DOMContentLoaded', function () {
    const clienteCadastrarInput = document.querySelector("#clienteNovo");
    const CPFInput = document.querySelector("#cpfFake");
    const RGInput = document.querySelector("#rgFake");
    const nascimentoInput = document.querySelector("#nascimento");
    const enderecoInput = document.querySelector("#endereco");
    const numeroInput = document.querySelector("#numero");
    const bairroInput = document.querySelector("#bairro");
    const cidadeInput = document.querySelector("#cidade");
    const ufInput = document.querySelector("#uf");
    const foneInput = document.querySelector("#fone");
    const emailInput = document.querySelector("#email");
    const ocupacaoInput = document.querySelector("#ocupacao");
    const spanAlert = document.querySelector('.alert');
    const msgAlert = document.querySelector('.msg');
    const buttonAlert = document.querySelector('#bottonAlert');

    const btnCadastro = document.querySelector("#cadastraCliente");

    btnCadastro.addEventListener('click', cadastrarCliente);

    function criaAlert(msg) {
        spanAlert.classList.toggle('alertDisplay')
        msgAlert.innerText = msg;
    }

    buttonAlert.addEventListener('click', criaAlert);

    function limparInput() {
        clienteCadastrarInput.value = '';
        CPFInput.value = '';
        RGInput.value = '';
        nascimentoInput.value = '';
        enderecoInput.value = '';
        numeroInput.value = '';
        bairroInput.value = '';
        cidadeInput.value = '';
        ufInput.value = '';
        foneInput.value = '';
        emailInput.value = '';
        ocupacaoInput.value = '';
    }

    function cadastrarCliente() {
        const cpfEnviado = CPFInput.value;
        const novoCPF = new ValidaCPF(cpfEnviado);

        CPFInput.addEventListener('input', () => {
            console.log(novoCPF.valida());
        });

        if (!novoCPF.valida()) {
            criaAlert('CPF inválido');
            return;
        }

        const urlCli = `http://204.216.187.179:3000/criarNovoCliente`;

        const clienteNome = clienteCadastrarInput.value;
        const cpf = String(novoCPF.cpfLimpo);
        const rg = RGInput.value;
        const nascimento = nascimentoInput.value;
        const endereco = enderecoInput.value;
        const numero = numeroInput.value;
        const bairro = bairroInput.value;
        const cidade = cidadeInput.value;
        const uf = ufInput.value;
        const fone = foneInput.value;
        const email = emailInput.value;
        const ocupacao = ocupacaoInput.value;

        fetch(urlCli, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clienteNome: clienteNome,
                cpf: cpf,
                rg: rg,
                nascimento: nascimento,
                endereco: endereco,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                fone: fone,
                email: email,
                ocupacao: ocupacao,
            })
        }).then(response => {
            if (response.ok) {
                const msg = 'Cliente cadastrado com sucesso.';
                criaAlert(msg);
                limparInput();
            } else {
                const msg = 'Erro ao cadastrar Cliente.';
                criaAlert(msg);
                console.error('Erro ao enviar o relatório para o MongoDB');
                console.error('Status da resposta:', response.status);
            }
        }).catch(error => {
            console.error('Erro ao enviar requisição:', error);
        });
    }

    class ValidaCPF {
        constructor(cpfEnviado) {
            Object.defineProperty(this, 'cpfLimpo', {
                writable: false,
                enumerable: false,
                configurable: false,
                value: cpfEnviado.replace(/\D+/g, '')
            });
        }

        eSequencia() {
            return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
        }

        geraDigito(cpfSemDigitos) {
            let total = 0;
            let reverso = Number(cpfSemDigitos.length) + 1;

            for (let stringNumerica of cpfSemDigitos) {
                total += reverso * Number(stringNumerica);
                reverso--;
            }

            const digito = 11 - (total % 11);
            return digito <= 9 ? String(digito) : '0';
        }

        geraNovoCpf() {
            const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
            const digito1 = this.geraDigito(cpfSemDigitos);
            const digito2 = this.geraDigito(cpfSemDigitos + digito1);
            this.novoCPFGerado = cpfSemDigitos + digito1 + digito2;
        }

        valida() {
            if (!this.cpfLimpo) return false;
            if (typeof this.cpfLimpo !== 'string') return false;
            if (this.cpfLimpo.length !== 11) return false;
            if (this.eSequencia()) return false;
            this.geraNovoCpf();
            return this.novoCPFGerado === this.cpfLimpo;
        }
    }
});
