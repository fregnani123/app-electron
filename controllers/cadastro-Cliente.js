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

    buttonAlert.addEventListener('click', criaAlert)


    function limparInput() {
        clienteCadastrarInput = '';
        CPFInput = '';
        RGInput = '';
        nascimentoInput = '';
        enderecoInput = '';
        numeroInput = '';
        bairroInput = '';
        cidadeInput = '';
        ufInput = '';
        foneInput = '';
        emailInput = '';
        ocupacaoInput = '';
    }

    function cadastrarCliente() {

        const urlCli = `http://204.216.187.179:3000/criarNovoCliente`;

        const clienteNome = clienteCadastrarInput.value;
        const cpf = CPFInput.value;
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
                criaAlert(msg)
                limparInput();
            } else {
                const msg = 'Erro ao cadastrar Cliente.'
                criaAlert(msg)
                console.error('Erro ao enviar o relatório para o MongoDB');
                console.error('Status da resposta:', response.status);
            }
        }).catch(error => {
            console.error('Erro ao enviar requisição:', error);
        });
    }


    class ValidaCPF {
        constructor(cpfEnviado) {
            Object.defineProperty(this, 'cpfEnviado', {
                writable: false,
                enumerable: false,
                configurable: false,
                value: cpfEnviado.replace(/\D+/g, '')
            });
        }
        valida() {
            if (!this.cpfEnviado) return false;
            return'cheguei aqui' 
        }

    }

    // CPFInput.addEventListener('input', () => {

    // })
    cpfEnviado = CPFInput.value;
    const novoCPF = new ValidaCPF("063.912.989-71")
    console.log(novoCPF.valida())

});
