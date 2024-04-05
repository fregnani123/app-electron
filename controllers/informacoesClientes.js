
document.addEventListener('DOMContentLoaded', function () {

    const filterCliente = document.getElementById('cpfFake');
    const nomeCliente = document.querySelector(".clienteNome1");
    const rgCliente = document.querySelector(".rgFakeCliente1");
    const DataNasc = document.querySelector(".nascimentoCliente1");
    const enderecoCliente = document.querySelector(".enderecoCliente1");
    const numeroCliente = document.querySelector(".numeroCliente1");
    const bairroCliente = document.querySelector(".bairroCliente1");
    const cidadeCliente= document.querySelector(".cidadeCliente1");
    const ufCliente= document.querySelector(".UFCliente1");
    const telefoneCliente= document.querySelector(".foneCliente1");
    const emailCliente= document.querySelector(".emailCliente1");
    const ocupacaoCliente= document.querySelector(".ocupacaoCliente1");


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
                nomeCliente.innerHTML = clienteImprimir.clienteNome;
                rgCliente.innerHTML = clienteImprimir.rg;
                DataNasc.innerHTML = new Date(clienteImprimir.nascimento).toLocaleDateString();
                enderecoCliente.innerHTML = clienteImprimir.endereco;
                numeroCliente.innerHTML = clienteImprimir.numero;
                bairroCliente.innerHTML = clienteImprimir.bairro;
                cidadeCliente.innerHTML = clienteImprimir.cidade;
                ufCliente.innerHTML = clienteImprimir.uf; 
                telefoneCliente.innerHTML = clienteImprimir.fone; 
                emailCliente.innerHTML = clienteImprimir.email; 
                ocupacaoCliente.innerHTML = clienteImprimir.ocupacao; 
            }

        }).catch(error => {
            console.error(error)
        })
    }

})
