
const menuItens = [
    { id: '1', texto: 'Painel de controle', to: './controllers.html' },
    { id: '2', texto: 'Realizar venda', to: './screenSales.html' },
    { id: '3', texto: 'Detalhes de venda', to: './detalhes-venda.html' },
    { id: '4', texto: 'Cadastro de produto', to: './Cadastro-de-produto.html' },
    { id: '5', texto: 'Alterar Produto', to: './alterar-produto.html' },
    { id: '6', texto: 'Excluir Produto', to: './excluir-produtos.html' },
    { id: '7', texto: 'Cadastro de cliente', to: './cadastro-cliente.html' },
    { id: '8', texto: 'Controle de entrada ', to: './controle-entrada.html' },
    { id: '9', texto: 'Agendamento', to: './agenda.html' },
    { id: '10', texto: '', to: '/controleES' },
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
    a.classList.add('a-menu')
    li.appendChild(a);
    return li;
}

menuItens.map(item => {
    const li = criaLi(item.texto,item.id,item.src,item.to ); 
    listMenu.appendChild(li);
});


