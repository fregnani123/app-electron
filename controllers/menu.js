
const menuItens = [
    { id: '1', texto: 'Painel de Controle', to: './controllers.html' },
    { id: '2', texto: 'Realizar venda', to: './screenSales.html' },
    { id: '3', texto: 'Detalhes de Venda', to: '../public/detalhes-venda.html' },
    { id: '4', texto: 'Produto', to: './Cadastro-de-produto.html' },
    // { id: '5', texto: 'Produto', to: '../public/alterar-produto.html' },
    // { id: '6', texto: 'Produto', to: '../public/excluir-produtos.html' },
    { id: '7', texto: 'Cadastro Cliente', to: '../public/cadastro-cliente.html' },
    { id: '8', texto: 'Entrada de Produtos no Estoque', to: '../public/controle-entrada.html' },
    { id: '9', texto: 'Agendamentos', to: '../public/agenda.html' },
    // { id: '10', texto: '', to: '/controleES' },
    { id: 'li-Exit', texto: '', src:'../img/exit.png', to: '../public/index.html' },
];

const listMenu = document.querySelector('#ul-Menu');
const containerMenu = document.querySelector("#container-menu");

function criaLi(texto, id, src, to) {
    const a = document.createElement('a');
    const li = document.createElement('li');
    a.textContent = texto;
    a.href = to;
    
    if (src && typeof src === 'string' && src.trim() !== ''){
        const img = document.createElement('img')
        img.src = src; 
        a.appendChild(img);
    }
   
    li.classList.add('menu-item-' + id);
    a.classList.add('a-menu' + id)
    li.appendChild(a);
    return li;
}

menuItens.map(item => {
    const li = criaLi(item.texto,item.id,item.src,item.to ); 
    listMenu.appendChild(li);
});


