

const menuPainel = [
    { id: '1', texto: 'Painel de controle', to: './controllers.html' },
    { id: '2', texto: 'Realizar venda', to: './screenSales.html' },
    { id: '3', texto: 'Detalhes de venda', to: '/detalhes' },
    { id: '4', texto: 'Cadastro de produto', to: '/cadastrarProduto' },
    { id: '5', texto: 'Alterar Produto', to: '/queryProdutos' },
    { id: '6', texto: 'Excluir Produto', to: '/queryProdutos' },
    { id: '7', texto: 'Cadastro de cliente', to: '/cadastroCliente' },
    { id: '8', texto: 'Controle de entrada ', to: '/controleES' },
    { id: '9', texto: 'Agendamento', to: '/controleES' },
    { id: '10', texto: '', to: '/controleES' },
    { id: 'li-Exit', texto: '', src: './img/exit.png', to: '/' },
];

function criaLi(texto, id, src, to) {
    const a = document.createElement('a');
    const li = document.createElement('li');
    if (src && typeof src === 'string' && src.trim() !== '') {
        const img = document.createElement('img')
        img.src = src;
        li.appendChild(img)
    }
    a.textContent = texto;
    a.href = to;
    li.classList.add('menu-item-' + id);
    li.appendChild(a);
    return li;
}


const listPainel = document.querySelector('#menu-painel');


menuPainel.map(itemPainel => {
    const li = criaLi(itemPainel.texto, itemPainel.id, itemPainel.src, itemPainel.to);
    listPainel.appendChild(li);
})