document.addEventListener('DOMContentLoaded', function () {
    const buttonAddCarrinho = document.getElementById('buttonAddCarrinho');
    const buttonLimparEAN = document.getElementById('button-clear');
    const buttonFinalizar = document.getElementById('finalizar-venda');
    const codigoEANInput = document.getElementById('input-EAN');
    const inputCPF = document.getElementById('inputCPF');
    const inputQtd = document.getElementById('input-qtd');
    const inputTroco = document.getElementById('dinheiro-recebido')
    const trocoCli = document.querySelector('#troco')
    const clienteADD = document.querySelector('#clienteEncontrado')
    const produtoCodigo = document.getElementById('codigo');
    const produtoNome = document.getElementById('produto');
    const produtoPreco = document.getElementById('preco');
    const produtoEstoque = document.getElementById('estoque');
    const totalCarrinho = document.querySelector('#total');
    const lista = document.getElementById('lista');
    const carrinho = [];
    let total = 0;
    let troco = 0;

    const clienteImprimir = []


    inputCPF.addEventListener('input', function (event) {
        const cpfDigitado = event.target.value;
        cpfDigitado.trim();
        buscarCliente(cpfDigitado);
    });

    function buscarCliente(cpf) {
        const urlCliente = 'http://204.216.187.179:3000/clientes';

        fetch(urlCliente)
            .then(response => response.json())
            .then(clientes => {
                console.log(clientes);
                const clienteEncontrado = clientes.find(cliente => Number(cliente.cpfFake) === Number(cpf));
                if (clienteEncontrado) {
                    clienteImprimir.push(clienteEncontrado);
                    console.log('Cliente encontrado:', clienteEncontrado);

                    // Agora você pode executar o código que depende da variável clienteImprimir
                    for (let nome of clienteImprimir) {
                        clienteADD.innerHTML = nome.cliente;
                        console.log(nome.cliente);
                    }
                } else {
                    console.log('Cliente não encontrado para o CPF:', cpf);
                }
            })
            .catch(error => {
                console.error('Ocorreu um erro ao buscar o cliente:', error);
            });
    }



    codigoEANInput.addEventListener('input', () => {
        const codigoEAN = codigoEANInput.value;
        if (codigoEAN.trim() !== '') {
            buscarProduto(codigoEAN);
        } else {
            produtoNome.innerText = '';
            produtoEncontrado = null;
        }
    });

    buttonAddCarrinho.addEventListener('click', () => {
        if (produtoEncontrado) {
            const quantidade = parseInt(inputQtd.value);
            const itemCarrinho = {
                produto: produtoEncontrado,
                quantidade: quantidade
            };

            carrinho.push(itemCarrinho);
            renderizarLista();

        } else {
            alert('Nenhum produto encontrado para adicionar ao carrinho.');
        }
    });

    function buscarProduto(codigoEAN) {
        const urlGetProduto = `http://204.216.187.179:3000/findProduto`;

        fetch(urlGetProduto)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    produtoEncontrado = data.find(produto => Number(produto.codigoDeBarras) === Number(codigoEAN));


                    if (produtoEncontrado) {
                        produtoCodigo.innerText = produtoEncontrado.codigoDeBarras;
                        produtoNome.innerText = produtoEncontrado.nome;
                        produtoPreco.innerText = produtoEncontrado.preco.toFixed(2);
                        produtoEstoque.innerText = produtoEncontrado.estoque;
                    } else {
                        produtoNome.innerText = 'Produto não encontrado';
                        produtoCodigo.innerText = ''
                        produtoPreco.innerText = ''
                        produtoEstoque.innerText = ''
                        inputQtd.value = '1'
                    }
                } else {
                    produtoNome.innerText = 'Dados inválidos retornados pela API';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o produto:', error);
                alert('Ocorreu um erro ao buscar o produto. Por favor, tente novamente.');
            });
    }




    function renderizarLista() {
        lista.innerHTML = '';

        carrinho.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('li-carrinho')
            li.textContent = `Cod:${item.produto.codigoDeBarras} - ${item.produto.nome} - Preço: R$ ${(item.produto.preco).toFixed(2)} x${item.quantidade}`;

            const buttonExcluir = document.createElement('button');
            buttonExcluir.classList.add('buttonExcluir');
            const imgExcluir = document.createElement('img')
            imgExcluir.src = '../img/remover.png';
            buttonExcluir.appendChild(imgExcluir)
            imgExcluir.classList.add('excluir')
            buttonExcluir.addEventListener('click', () => {
                carrinho.splice(index, 1);
                renderizarLista();
            });
            li.appendChild(buttonExcluir);
            lista.appendChild(li);
        });

        total = calcularTotalCarrinho(carrinho);
        totalCarrinho.innerHTML = `${total}`;
    };

    inputTroco.addEventListener('input', () => {
        const dinheiroCLi = inputTroco.value;
        if (dinheiroCLi.trim() !== '') {
            const troco = Number(dinheiroCLi) - Number(total);
            if (troco >= 0) {
                trocoCli.innerText = `${troco.toFixed(2)}`;
            } else {
                trocoCli.innerText = 'Valor insuficiente';
            }
        }
        if (dinheiroCLi === '') {
            return trocoCli.innerHTML = ''
        }
    });

    function calcularTotalCarrinho(calc) {
        const total = calc.reduce((acc, item) => {
            return acc + (item.produto.preco * item.quantidade);
        }, 0);

        return total.toFixed(2);
    }

    function limparInputEAN() {
        produtoCodigo.innerText = ''
        produtoPreco.innerText = ''
        produtoEstoque.innerText = ''
        codigoEANInput.value = '';
        produtoNome.innerText = '';
        inputQtd.value = '1';
    }

    buttonLimparEAN.addEventListener('click', limparInputEAN)

//     const relatório = {
//             carrinho: carrinho,
//             cliente: clienteADD,
//             dateVenda: dataVenda,
//             dinheiroRecebido: dinheiroRecebido,
//             formaPagamento: formaPagamento,
//             total: total,
//    }



    buttonFinalizar.addEventListener('click', () => {
        const groupedItems = {};

        // Agrupar os itens do carrinho pelo código de barras do produto
        carrinho.forEach(item => {
            const codigoDeBarras = item.produto.codigoDeBarras;
            const quantidade = Number(item.quantidade);

            if (groupedItems[codigoDeBarras]) {
                groupedItems[codigoDeBarras].quantidade += quantidade;
            } else {
                groupedItems[codigoDeBarras] = {
                    produto: item.produto,
                    quantidade: quantidade
                };
            }
        });

        // Atualizar o estoque para cada produto
        Object.values(groupedItems).forEach(item => {
            const novoEstoque = Number(item.produto.estoque) - item.quantidade;
            const urlPatchProduto = `http://204.216.187.179:3000/updateProduto/${item.produto.codigoDeBarras}`;

            fetch(urlPatchProduto, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ estoque: novoEstoque })
            })
                .then(response => {
                    if (response.ok) {
                        console.log(`Estoque atualizado para o produto ${item.produto.nome}`);
                    } else {
                        console.error(`Erro ao atualizar o estoque para o produto ${item.produto.nome}`);
                    }
                })
                .catch(error => {
                    console.error('Erro ao atualizar o estoque:', error);
                });
        });

        limparInputEAN();
        carrinho.length = 0;
        lista.innerHTML = '';
        totalCarrinho.innerHTML = '0.00';
    });


        })

