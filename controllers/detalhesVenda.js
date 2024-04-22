document.addEventListener('DOMContentLoaded', function () {
const urlPedidos = 'http://204.216.187.179:3000/detalhes';
const inputNumero = document.querySelector('#inputNumero')

const numero = document.querySelector('#th1');
const clienteVazio = document.querySelector('#th2');
const dataV = document.querySelector('#th3');
const formaPag = document.querySelector('#th4');
const total = document.querySelector('#th5');
const spanNumero = document.querySelector('#spanNumero');
const listaItens = document.querySelector('#listaItens');
const listaItensTodos = document.querySelector('#listaItensTodos');

const valoresDinheiro = document.querySelector('.valoresDinheiro');
const valoresCartao = document.querySelector('.valoresCartao');
const valoresPIX = document.querySelector('.valoresPIX');
const totalRelatorio = document.querySelector('.valorTotal');

let SD, ED;

filterPedidos(SD,ED)

const startDate = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');


startDate.addEventListener('change', () => {
    SD = startDate.value;  
});

endDate.addEventListener('change', () => {
    ED = endDate.value; 

    filterPedidos(SD, ED);
});

function filterPedidos(SD, ED) {
    fetch(urlPedidos, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('Freg123:Freg_1308')
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Erro ao buscar pedidos: ' + response.status);
        }
        return response.json();
    }).then((DataTodosPedidos) => {
        console.log("Dados recebidos da API:", DataTodosPedidos);

        const pedidosDatas = DataTodosPedidos.filter(pedido => {
            const pedidoDate = new Date(pedido.dateVenda);
            return pedidoDate >= new Date(SD) && pedidoDate <= new Date(ED);   
            
        });

        for (pedidos of pedidosDatas) {
            const li = document.createElement('li');
            li.classList.add('listaPedidos');

            const spanNumero = document.createElement('span');
            spanNumero.classList.add('spanNumero');
            spanNumero.textContent = pedidos.numeroPedido;
           

            const spanCliente = document.createElement('span');
            spanCliente.classList.add('spanCliente');
            spanCliente.textContent = pedidos.cliente;
           

            const spanDate = document.createElement('span');
            spanDate.classList.add('spanDateNovo');
            const dateBr = new Date(pedidos.dateVenda).toLocaleString('pt-BR')
            spanDate.textContent = dateBr;

        
            const spanPag = document.createElement('span');
            spanPag.classList.add('spanPag');
            spanPag.textContent = pedidos.formaPagamento;

            const spanTotal = document.createElement('span');
            spanTotal.classList.add('spaTotal');
            spanTotal.textContent = Number(pedidos.total).toFixed(2);
           
            li.classList.add('liPedidos');
            li.appendChild(spanNumero);
            li.appendChild(spanCliente);
            li.appendChild(spanDate);
            li.appendChild(spanPag);
            li.appendChild(spanTotal);
            listaItensTodos.appendChild(li)

             }

            const totalDinheiro = pedidosDatas.reduce((total, pedido) => {
                if (pedido.formaPagamento === 'Dinheiro') {
                    
                    return total + pedido.total;
                } else {
                    return total;
                }
            }, 0);

        
            const totalCartao = pedidosDatas.reduce((total, pedido) => {
                if (pedido.formaPagamento === 'Cartao') {
                    
                    return total + pedido.total;
                } else {
                    return total;
                }
            }, 0);
        
            const totalPIX = pedidosDatas.reduce((total, pedido) => {
                if (pedido.formaPagamento === 'PIX') {
                    
                    return total + pedido.total;
                } else {
                    return total;
                }
            }, 0);

            valoresDinheiro.innerHTML =totalDinheiro.toFixed(2);
            valoresCartao.innerHTML =totalCartao.toFixed(2);
            valoresPIX.innerHTML = totalPIX.toFixed(2);
           totalRelatorio.innerHTML = parseFloat(totalDinheiro + totalCartao + totalPIX).toFixed(2)
        
        
        

        console.log("Pedidos no período:", pedidosDatas);

    }).catch(error => {
        console.error('Erro ao buscar pedidos:', error);
    });
}


function formatarDataHoraBr(data) {
    return new Date(data).toLocaleString('pt-BR');
}


const data = new Date();
const dataFormatadaBr = formatarDataHoraBr(data);
console.log(dataFormatadaBr);



inputNumero.addEventListener('input', () => {
    const np = inputNumero.value
    buscarPedido(np)

    if (np === '') {
        listaItens.innerText = ''
        numero.innerText = ''
        spanNumero.innerText = ''
        clienteVazio.innerText = ''
        dataV.innerText = ''
        formaPag.innerText = ''
        total.innerText = ''
    }

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
                    numero.innerText = pedido.numeroPedido;
                    spanNumero.innerText = ` - Nº ${pedido.numeroPedido}`;
                    clienteVazio.innerText = pedido.cliente;
                    dataV.innerText = formatarDataHoraBr(pedido.dateVenda);
                    formaPag.innerText = pedido.formaPagamento;
                    total.innerText = Number(pedido.total).toFixed(2);
                    
                    for (let item of pedido.carrinho) {
                        const li = document.createElement('li');
                        
                        const spanCodigo = document.createElement('span');
                        spanCodigo.classList.add('codigo');
                        spanCodigo.textContent = item.codigoDeBarras;

                        const spanProdutos = document.createElement('span');
                        spanProdutos.classList.add('produtos');
                        spanProdutos.textContent = item.nome;

                        const spanVlUnitario = document.createElement('span');
                        spanVlUnitario.classList.add('vlUnitario');
                        spanVlUnitario.textContent = Number(item.preco).toFixed(2);

                        const spanQtde = document.createElement('span');
                        spanQtde.classList.add('qtde');
                        spanQtde.textContent = item.quantidade;

                        const spanVlTotal = document.createElement('span');
                        spanVlTotal.classList.add('vlTotal');
                        spanVlTotal.textContent = Number(item.preco * item.quantidade).toFixed(2);

                        li.classList.add('liList');
                        li.appendChild(spanCodigo);
                        li.appendChild(spanProdutos);
                        li.appendChild(spanVlUnitario);
                        li.appendChild(spanQtde);
                        li.appendChild(spanVlTotal);
                        listaItens.appendChild(li);
                    }

                }
               

            }
        }
    }).catch(err => console.error('mensagem de erro', err));
}
})