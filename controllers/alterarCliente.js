document.addEventListener('DOMContentLoaded', function () {
    const clienteCadastrarInput = document.querySelector("#clienteNovo");
    const filterCliente = document.querySelector("#cpfFake");
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
    const buttonAlterar = document.querySelector('#cadastraCliente');
    const buttonAlert = document.querySelector('#bottonAlert');

    function criaAlert(msg) {
        spanAlert.classList.toggle('alertDisplay')
        msgAlert.innerText = msg;
    }

    buttonAlert.addEventListener('click', criaAlert);




    filterCliente.addEventListener('input', () => {
        const cpfCliente = filterCliente.value;
        filtrarInformacoes(cpfCliente)

    })

    function filtrarInformacoes(cpf) {
        const urlCliente = 'http://204.216.187.179:3000/clientes';

        fetch(urlCliente, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308')
            }
        }
        ).then(response => {
            return response.json()
        }).then(clienteEncontrado => {
            const clienteImprimir = clienteEncontrado.find(cliente => cliente.cpf === cpf)
            if (clienteImprimir) {
                clienteCadastrarInput.value = clienteImprimir.clienteNome;
                RGInput.value = clienteImprimir.rg;
                nascimentoInput.value = new Date(clienteImprimir.nascimento).toLocaleDateString();
                enderecoInput.value = clienteImprimir.endereco;
                numeroInput.value = clienteImprimir.numero;
                bairroInput.value = clienteImprimir.bairro;
                cidadeInput.value = clienteImprimir.cidade;
                ufInput.value = clienteImprimir.uf;
                foneInput.value = clienteImprimir.fone;
                emailInput.value = clienteImprimir.email;
                ocupacaoInput.value = clienteImprimir.ocupacao;
            }

        }).catch(error => {
            console.error(error)
        })
    }


    buttonAlterar.addEventListener('click', updateCliente);


    function updateCliente() {

        const urlUpdate = `http://204.216.187.179:3000/updateProduto/${EANDigitado}`;

        const clienteCadastrarInput1 = clienteCadastrarInput.value;
        const RGInput1 = RGInput.value;
        const nascimentoInpu1t = nascimentoInput.value;  
        const enderecoInput1 = enderecoInput.value; 
        const numeroInput1 = numeroInput.value; 
        const bairroInput1 = bairroInput.value;  
        const cidadeInput1 = cidadeInput.value;
        const ufInput1 = ufInput.value;
        const foneInput1 = foneInput.value; 
        const emailInput1 = emailInput.value;  
        const ocupacaoInput1 = ocupacaoInput.value;  


        const produto = {
            clienteNome: clienteCadastrarInput1,
            rg: RGInput1,
            nascimento: nascimentoInpu1t,
            endereco: enderecoInput1,
            numero: numeroInput1,
            bairro: bairroInput1,
            cidade: cidadeInput1,
            uf: ufInput1,
            fone: foneInput1,
            email: emailInput1,
            ocupacao: ocupacaoInput1,
        };


        fetch(urlUpdate, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar produto: ' + response.status);
                } else {
                    const msg = 'Produto atualizado com sucesso!'
                    criaAlert(msg);
                    limparInput();
                }

            })
            .catch(error => {
                console.error('Erro ao atualizar produto:', error);
            });
    }
    
    function limparInput() {
        clienteCadastrarInput.value = '';
        filterCliente = '';
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

})