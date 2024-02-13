

const menuPainel1 = [
    { id: '1', texto: 'Painel de controle', src: './img/logo.ico', to: './controllers.html' },
    { id: '2', texto: 'Realizar venda', src: './img/carrinho-de-compras.png', to: './screenSales.html' },
    { id: '3', texto: 'Detalhes de venda', src: './img/detalhes vendas.png', to: '/' },
    { id: '4', texto: 'Cadastro de produto', src: './img/cadastro de produtos.png', to: '/' },
    { id: '5', texto: 'Alterar Produto', src: './img/alterar.png', to: '/' },
];

const menuPainel2 = [
    { id: '6', texto: 'Excluir Produto', src: './img/remover.png', to: '/' },
    { id: '7', texto: 'Cadastro de cliente', src: './img/cliente.png', to: '/' },
    { id: '8', texto: 'Controle de entrada ', src: './img/caixa-de-entrada.png', to: '/' },
    { id: '9', texto: 'Agendamento', src: './img/carrinho-de-compras.png', to: '/' },
    { id: '11', texto: 'Suporte', src: './img/carrinho-de-compras.png', to: '/' },
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
    li.classList.add('menu-painel-' + id);
    li.appendChild(a);
    return li;
}

const listPainel1 = document.querySelector('#menu-painel1');
const listPainel2 = document.querySelector('#menu-painel2');

menuPainel1.map(itemPainel => {
    const li = criaLi(itemPainel.texto, itemPainel.id, itemPainel.src, itemPainel.to);
    listPainel1.appendChild(li);
})
menuPainel2.map(itemPainel => {
    const li = criaLi(itemPainel.texto, itemPainel.id, itemPainel.src, itemPainel.to);
    listPainel2.appendChild(li);
})
