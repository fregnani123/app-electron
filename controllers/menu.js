
const menuItens = [
    { id: '1', texto: 'Painel de controle', to: './controllers.html' },
    { id: '2', texto: 'Realizar venda', to: './screenSales.html' },
    { id: '3', texto: 'Detalhes de venda', to: '/detalhes' },
    { id: '4', texto: 'Cadastro de produto', to: '/cadastrarProduto' },
    { id: '5', texto: 'Alterar / Excluir produto', to: '/queryProdutos' },
    { id: '6', texto: 'Cadastro de cliente', to: '/cadastroCliente' },
    { id: '7', texto: 'Controle de entrada ', to: '/controleES' },
    { id: '8', texto: 'Agendamento', to: '/controleES' },
    { id: '9', texto: '', to: '/controleES' },
    { id: 'li-Exit', texto: '', src:'./img/exit.png', to: '/' },
];

const listMenu = document.querySelector('#ul-Menu')
const containerMenu = document.querySelector("#container-menu")


function criaLi(texto, id, src, to) {
    const a = document.createElement('a');
    const li = document.createElement('li');
    if (src && typeof src === 'string' && src.trim() !== ''){
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

menuItens.map(item => {
    const li = criaLi(item.texto,item.id,item.src,item.to ); 
    listMenu.appendChild(li);
});


