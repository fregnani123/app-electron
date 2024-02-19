const urlGetProduto = 'http://204.216.187.179:3000/findProduto';
const urlGetCliente = 'http://204.216.187.179:3000/clientes';
const urlRelatorio = "http://204.216.187.179:3000/detalhesdevendaPost";


const inputEAN = document.querySelector('#input-EAN');
const codigoEAN = document.querySelector('#codigo');
const codigoCPF = document.querySelector('#buscar-cliente');
const produtoEncontrado = document.querySelector('#produtoEncontrado');
const preco = document.querySelector('#preco');
const estoque = document.querySelector('#estoque');

const buttonAddCarrinho = document.querySelector('#buttonAddCarrinho');
const buttonClear = document.querySelector('#button-clear');
const buttonFinalizar = document.querySelector('#finalizarCompra');

const listaCarrinho = document.querySelector('#carrinho-add');
const totalVenda = document.querySelector('#total');
const inputQtd = document.querySelector('#input-qtd');
const formaPagamento = document.querySelector('#forma-pagamento');
const troco = document.querySelector('#troco');
const dinheiroRecebido = document.querySelector('#dinheiro-recebido');
const clienteAdd = document.querySelector('#cliente-add');

function calcularTroco() {
    const valor = dinheiroRecebido.value;

    if (!isNaN(parseFloat(valor))) {
        const trocoValue = parseFloat(valor) - total;

        if (trocoValue > 0) {
            troco.innerText = trocoValue.toFixed(2);
        } else {
            troco.innerText = '';
        }
    } else {
        troco.innerText = '';
    }
}


let resultadoFiltrado;

codigoCPF.addEventListener('input', function () {
    const CPF = codigoCPF.value.trim();
    if (CPF.length === 7) {
        fetch(urlGetCliente)
            .then(res => res.json())
            .then(data => {
                const dataCliente = data;
                globalDataClienteFiltrado = dataCliente.filter(cliente => {
                    return cliente.rgFake.includes(CPF);
                });

                if (globalDataClienteFiltrado.length > 0) {
                    clienteAdd.value = globalDataClienteFiltrado[0].cliente;
                } else {
                    clienteAdd.value = "";
                    
                }
           
                resultadoFiltrado = globalDataClienteFiltrado;
              

            }).catch((error) => {
                console.error('Erro ao buscar dados:', error);
            });
    } else {
        clienteAdd.value = "";
    }
});

inputEAN.addEventListener('input', function () {
    const codigo = inputEAN.value.trim();

    if (codigo !== '') {
        fetch(urlGetProduto)
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


buttonAddCarrinho.addEventListener('click', addCarrinho);

function addCarrinho(event) {
    event.preventDefault();
    if (!inputEAN.value) {
        alert('Campo EAN vazio ou produto não encontrado.');
        return;
    }
    if (!inputQtd.value || inputQtd.value === 0) {
        alert('Informe a quantidade de produtos.');
        return;
    }
    // Adiciona os itens filtrados atualmente ao carrinho, de acordo com a quantidade especificada
    for (let i = 0; i < parseInt(inputQtd.value); i++) {
        const existingItemIndex = itensCarrinho.findIndex(item => item.codigoDeBarras === globalDataFiltrados[0].codigoDeBarras);
        if (existingItemIndex !== -1) {
            // Se o item já existir no carrinho, apenas incrementa a quantidade
            itensCarrinho[existingItemIndex].quantidade++;
        } else {
            // Se o item não existir no carrinho, adiciona-o
            itensCarrinho.push({ ...globalDataFiltrados[0], quantidade: 1 });
        }
    }

    atualizaCarrinho();
}


buttonClear.addEventListener('click', clearCampoProdutos);
function clearCampoProdutos() {
    codigoEAN.innerHTML = '';
    produtoEncontrado.innerHTML = '';
    estoque.innerHTML = '';
    preco.innerHTML = '';
    inputEAN.value = '';
    inputQtd.value = '';
}

function criaListaCarrinho(chave, produto) {
    const li = document.createElement('li');
    li.innerText = `${chave}: x ${produto.quantidade}`;
    li.classList.add('lista-carrinho');
    return li;
}

function atualizaCarrinho() {
    listaCarrinho.innerHTML = '';


    console.log(groupedItems);

    for (let produto of itensCarrinho) {

        const chave = `${produto.codigoDeBarras} ${produto.nome} R$${produto.preco.toFixed(2)}`;

        if (!groupedItems[chave]) {
            groupedItems[chave] = {
                quantidade: 1,
                codigoDeBarras: produto.codigoDeBarras,
                estoque: produto.estoque,
            };
           
        } else {

            groupedItems[chave].quantidade++;
        }
    }

    for (let chave in groupedItems) {
        if (groupedItems.hasOwnProperty(chave)) {
            const produto = groupedItems[chave];
            const li = criaListaCarrinho(chave, produto);
            listaCarrinho.appendChild(li);
        }
    }

    
    total = itensCarrinho.reduce((valores, item) => {
        return valores + item.preco;
    }, 0);

    totalVenda.innerText = total.toFixed(2);

    codigoEAN.innerHTML = '';
    produtoEncontrado.innerHTML = '';
    estoque.innerHTML = '';
    preco.innerHTML = '';
    inputEAN.value = '';
    inputQtd.value = 1;
    
}
let total;
let itensCarrinho = [];
let groupedItems = {};

function limparInformacoesVenda() {
    codigoEAN.innerHTML = '';
    produtoEncontrado.innerHTML = '';
    estoque.innerHTML = '';
    preco.innerHTML = '';
    inputEAN.value = '';
    inputQtd.value = '';
    clienteAdd.value = '';
    listaCarrinho.innerHTML = '';
    totalVenda.innerText = '';
    formaPagamento.value = '';
    dinheiroRecebido.value = '';
    troco.innerText = '';
    codigoCPF.value = '';
    itensCarrinho = [];
}

buttonFinalizar.addEventListener('click', function () {

    const relatorio = {
        "listaCarrinho": [...itensCarrinho],
        "cliente": clienteAdd.value.trim(),
        "total": total.toFixed(2),
        "formaPagamento": formaPagamento.value.trim(),
        "dinheiroRecebido": dinheiroRecebido.value.trim(),
        "troco": troco.innerText.trim()
    };

    atualizaEstoqueDb(groupedItems); // Passando groupedItems como parâmetro
    if (!formaPagamento.value) {
        alert('Selecione a forma de pagamento.')
    } else (

        limparInformacoesVenda()
    )
    console.log(relatorio);
});

function atualizaEstoqueDb(groupedItems) { // Recebendo groupedItems como parâmetro
    for (let chave in groupedItems) {
        if (groupedItems.hasOwnProperty(chave)) {
            const produto = groupedItems[chave];
            const urlEstoque = `http://204.216.187.179:3000/updateProduto/${produto.codigoDeBarras}`;

            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ estoque: produto.estoque - produto.quantidade })
            };

            fetch(urlEstoque, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Não foi possível atualizar o estoque do produto ' + produto.codigoDeBarras);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Estoque do produto ' + produto.codigoDeBarras + ' atualizado com sucesso:', data);
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao atualizar o estoque do produto ' + produto.codigoDeBarras + ':', error);
                });
        }
    }
}
