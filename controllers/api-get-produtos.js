const url = 'http://204.216.187.179:3000/findProduto';
const inputEAN = document.querySelector('#input-EAN');
const codigoEAN = document.querySelector('#codigo');
const produtoEncontrado = document.querySelector('#produtoEncontrado');
const preco = document.querySelector('#preco');
const estoque = document.querySelector('#estoque');
const buttonAddCarrinho = document.querySelector('#buttonAddCarrinho');
const listaCarrinho = document.querySelector('#carrinho-add');
const totalVenda = document.querySelector('#total');
const inputQtd = document.querySelector('#input-qtd');

let itensCarrinho = [];
let globalDataFiltrados = [];

function criaListaCarrinho(produto, quantidade) {
    const li = document.createElement('li');
    li.innerText = `${produto} (Quantidade: ${quantidade})`;
    li.classList.add('lista-carrinho');
    return li;
}
inputEAN.addEventListener('input', function () {
    const codigo = inputEAN.value.trim();
    console.log(codigo);
    if (codigo !== '') {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const globalData = data;
                globalDataFiltrados = globalData.filter(item => {
                    return Number(item.codigoDeBarras) === Number(codigo);
                });

                for (let item of globalDataFiltrados) {
                    codigoEAN.innerHTML = item.codigoDeBarras;
                    produtoEncontrado.innerHTML = item.nome;
                    preco.innerHTML = item.preco.toFixed(2);
                    estoque.innerHTML = item.estoque;
                };
               
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }
});

// Adiciona o ouvinte de evento 'click' fora do evento 'input'
buttonAddCarrinho.addEventListener('click', addCarrinho);

function addCarrinho(event) {
    event.preventDefault();

    // Adiciona os itens filtrados atualmente ao carrinho, de acordo com a quantidade especificada
    for (let i = 0; i < parseInt(inputQtd.value); i++) {
        for (let produto of globalDataFiltrados) {
            itensCarrinho.push({ ...produto }); // Adiciona um novo objeto com as mesmas propriedades do produto
        }
    }

    // Atualiza a exibição do carrinho
    atualizaCarrinho();
}

function atualizaCarrinho() {
    listaCarrinho.innerHTML = '';

    // Agrupa os itens no carrinho e conta quantas vezes cada um aparece
    const groupedItems = {};
    for (let produto of itensCarrinho) {
        if (!groupedItems[produto.nome]) {
            groupedItems[produto.nome] = 0;
        }
        groupedItems[produto.nome]++;
    }

    // Adiciona os itens agrupados ao carrinho
    for (let produto in groupedItems) {
        const li = criaListaCarrinho(produto, groupedItems[produto]);
        listaCarrinho.appendChild(li);
    }

    const total = itensCarrinho.reduce((valores, item) => {
        return valores + item.preco;
    }, 0)

    codigoEAN.innerHTML = '';
    produtoEncontrado.innerHTML = '';
    estoque.innerHTML = '';
    preco.innerHTML = '';
    inputEAN.value = '';

    totalVenda.innerText = total.toFixed(2);
}
