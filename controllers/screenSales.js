document.addEventListener('DOMContentLoaded', function () {
    const buttonAddCarrinho = document.getElementById('buttonAddCarrinho');
    const buttonLimparEAN = document.getElementById('button-clear');
    const buttonFinalizar = document.getElementById('finalizar-venda');
    const codigoEANInput = document.getElementById('input-EAN');
    const inputCPF = document.getElementById('inputCPF');
    const inputQtd = document.getElementById('input-qtd');
    const selectPagamento = document.getElementById('forma-pagamento');
    const dinheiroCliente = document.getElementById('dinheiro-recebido')
    const trocoCli = document.querySelector('#troco')
    const clienteADD = document.querySelector('#clienteEncontrado')
    const produtoCodigo = document.getElementById('codigo');
    const produtoNome = document.getElementById('produto');
    const produtoPreco = document.getElementById('preco');
    const produtoEstoque = document.getElementById('estoque');
    const totalCarrinho = document.querySelector('#total');
    const lista = document.getElementById('lista');
    const spanAlert = document.querySelector('.alert');
    const msgAlert= document.querySelector('.msg');
    const buttonAlert = document.querySelector('#bottonAlert');
    const carrinho = [];

    function criaAlert(msg) {
        spanAlert.classList.toggle('alertDisplay')
        msgAlert.innerText = msg;
    }

    buttonAlert.addEventListener('click',criaAlert)

    inputCPF.addEventListener('input', function (event) {
        const cpfDigitado = event.target.value;
        if (!cpfDigitado) {
            clienteADD.value = 'Consumidor'
        }
        cpfDigitado.trim();
        buscarCliente(cpfDigitado);
    });

    function buscarCliente(cpf) {
        const urlCliente = 'http://204.216.187.179:3000/clientes';

        fetch(urlCliente)
            .then(response => response.json())
            .then(clientes => {
                if (!cpf || cpf.trim() === '') { // Verifica se o CPF está vazio
                    clienteADD.value = 'Consumidor'; // Define "Consumidor" como o valor padrão
                    return; // Retorna para evitar a execução do código abaixo
                }

                if (Array.isArray(clientes)) {
                    clienteEncontrado = clientes.find(cliente => Number(cliente.cpfFake) === Number(cpf));
                    if (clienteEncontrado) {
                        clienteADD.value = clienteEncontrado.cliente;
                    } else if (cpf.length > 9 && !clienteEncontrado) {
                        clienteADD.value = 'Cliente não encontrado para o CPF digitado.';
                    }
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
            const msg = 'Nenhum produto encontrado para adicionar ao carrinho.';
            criaAlert(msg)
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
                const msg = 'Ocorreu um erro ao buscar o produto. Por favor, tente novamente.';
                criaAlert(msg)
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


        const total = calcularTotalCarrinho(carrinho);
        totalCarrinho.innerHTML = `${total}`;

        dinheiroCliente.addEventListener('input', () => {
         dinheiro = dinheiroCliente.value 
             trocoSoma = dinheiro - total 
            return trocoCli.innerText = trocoSoma.toFixed(2) < 0 ? '' : trocoSoma.toFixed(2) ; 
        }
        )

    };


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


    buttonLimparEAN.addEventListener('click', limparInputEAN);

    const relatorio = {
        carrinho: [],
        cliente: '',
        dateVenda: new Date().toLocaleDateString(),
        dinheiroCliente: '',
        formaPagamento: '',
        totalCompra: '',
        trocoCliente: '',
    };

    // Função para atualizar e exibir o relatório
    function atualizarRelatorio() {
        relatorio.carrinho = carrinho.map(item => ({
            produto: item.produto,
            quantidade: item.quantidade
        }));
        relatorio.cliente = clienteADD.value;
        relatorio.dinheiroCliente = dinheiroCliente.value;
        relatorio.trocoCliente = trocoSoma.toFixed(2);
        // Number(dinheiroCliente.value - calcularTotalCarrinho(relatorio.carrinho)).toFixed(2) < 0 ? '0,00' : relatorio.trocoCliente,
            relatorio.formaPagamento = selectPagamento.value;
        relatorio.totalCompra = calcularTotalCarrinho(relatorio.carrinho)

        console.log(relatorio);
    }

    buttonFinalizar.addEventListener('click', () => {
        const groupedItems = {};
        const formaPagamento = selectPagamento.value;
        const dinheiroRecebido = dinheiroCliente.value;

        if (carrinho.length === 0) {
            const msg = 'O Carrinho está vázio, para finalizar adicione pelo menos um ítem.'
            criaAlert(msg)
            return;
        }
       
        if (formaPagamento === 'Dinheiro' && dinheiroRecebido === '') {
            const msg = 'Por favor, insira o valor recebido em dinheiro.';
            criaAlert(msg)
            return; // Impede a execução adicional do código
        }
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
        atualizarRelatorio()
        limparInputEAN();
        inputCPF.value = 1
        carrinho.length = 0;
        lista.innerHTML = '';
        dinheiroCliente.value = '',
        trocoCli.innerText = '',
        totalCarrinho.innerHTML = '0.00';
    });


})

