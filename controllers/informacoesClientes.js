
document.addEventListener('DOMContentLoaded', function () {

    const filterCliente = document.getElementById('cpfFake')


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
                console.log(clienteImprimir)
            }
            
        }).catch(error => {
            console.error(error)
        })
    }

})
