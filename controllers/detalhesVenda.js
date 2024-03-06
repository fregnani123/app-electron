
const urlPedidos = 'http://204.216.187.179:3000/detalhes';
const inputNumero = document.querySelector('#inputNumero')

const numero = document.querySelector('#th1');
const clienteVazio = document.querySelector('#th2');
const dataV = document.querySelector('#th3');
const formaPag = document.querySelector('#th4');
const total = document.querySelector('#th5');

function formatarDataHoraBr(data) {
    return new Date(data).toLocaleString('pt-BR');
}


const data = new Date(); 
const dataFormatadaBr = formatarDataHoraBr(data);
console.log(dataFormatadaBr); 


inputNumero.addEventListener('input', () => {
    const np = inputNumero.value
    buscarPedido(np)
})

function buscarPedido(np) {
    fetch(urlPedidos, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('Freg123:Freg_1308')
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar pedidos: ' + response.status);
        }
        return response.json();
    }).then(dataPedido => {
        if (dataPedido.length === 0) {
            console.log('Nenhum pedido encontrado.');
        } else {
            const pedidoFiltrado = dataPedido.filter(pedido => Number(pedido.numeroPedido) === Number(np));
            console.log(pedidoFiltrado)
            if (pedidoFiltrado.length === 0) {
                if (clienteVazio) {
                    clienteVazio.innerText = `Nenhum pedido correspondente encontrado.`;
                } else {
                    console.log('Nenhum pedido correspondente encontrado.');
                }
            } else {
                for (let pedido of pedidoFiltrado) {
                    numero.innerText =  pedido.numeroPedido
                    clienteVazio.innerText = pedido.cliente;
                    dataV.innerText = formatarDataHoraBr(pedido.dateVenda);
                    formaPag.innerText = pedido.formaPagamento
                    total.innerText = pedido.total
                }
               
            }
        }
    }).catch(err => console.error('mensagem de erro', err));
}
