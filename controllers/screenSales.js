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
    const date = document.querySelector('.date')

    date.innerText = dateVenda = new Date().toLocaleDateString();

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
          let trocoSoma = (dinheiro - total).toFixed(2) 
            return trocoCli.innerText = trocoSoma < 0 ? '' : trocoSoma ; 
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

    function enviarRelatorio() {
        
        const urlRelatorio = 'http://204.216.187.179:3000/detalhesdevendaPost';
        const cliente = clienteADD.value;
        const dateVenda = new Date().toISOString(); // Convertendo para o formato ISO
        const dinheiroRecebido = dinheiroCliente.value || 0; // Definindo um valor padrão caso esteja vazio ou nulo
        const formaPagamento = selectPagamento.value;
        const totalCompra = totalCarrinho.innerHTML;

        const carrinhoToSend = carrinho.map(item => {
            return {
                codigoDeBarras: item.produto.codigoDeBarras,
                nome: item.produto.nome,
                preco: item.produto.preco,
                quantidade: item.quantidade
            };
        });

        fetch(urlRelatorio, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                carrinho: carrinhoToSend,
                cliente: cliente,
                dateVenda: dateVenda,
                dinheiroRecebido: dinheiroRecebido,
                formaPagamento: formaPagamento,
                total: totalCompra,
            })
        }).then(response => {
            if (response.ok){
                console.log('Relatório enviado para o MongoDB com sucesso!');
            } else {
                console.error('Erro ao enviar o relatório para o MongoDB');
                console.error('Status da resposta:', response.status);
            }
        }).catch(error => {
            console.error(error);
        });
    }


    const urlPrint = 'http://204.216.187.179:3000/detalhes';
    const divContent = document.querySelector('.printVenda');

    fetch(urlPrint)
        .then((res) => {
            return res.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const ultimoPedido = data.pop(); // Definindo ultimoPedido dentro do escopo
                if (ultimoPedido) {
                    // Criando a tabela
                    const ul = document.createElement('ul');
                    ul.classList.add('pedidoPrint');

                    ul.innerHTML = `
                    <li class='liPrint'>Nome da Loja:<span>Gestão Lite</span></li>
                    <li class='liPrint'><span class='label'>Data:</span> <span class='value'>${new Date(ultimoPedido.dateVenda).toLocaleDateString()}</span></li>
                    <li class='liPrint'><span class='label'>Cliente:</span> <span class='value'>${ultimoPedido.cliente}</span></li>
                    <li class='liPrint'><span class='label'>Total:</span> <span class='value'>${ultimoPedido.total.toFixed(2)}</span></li>
                    <li class='liPrint'><span class='label'>Dinheiro Recebido:</span> <span class='value'>${ultimoPedido.dinheiroRecebido.toFixed(2)}</span></li>
                    <li class='liPrint'><span class='label'>Forma de Pagamento:</span> <span class='value'>${ultimoPedido.formaPagamento}</span></li>
                    <li class='liPrint'><span class='label'>Troco:</span> <span class='value'>${(Number(ultimoPedido.dinheiroRecebido) - Number(ultimoPedido.total)).toFixed(2)}</span></li>
                `;

                    // Iterar sobre os itens do carrinho
                    ultimoPedido.carrinho.forEach(item => {
                        const nomeDoProduto = item.nome;
                        const precoDoProduto = item.preco;
                        const quantidadeDoProduto = item.quantidade;

                        // Adicionar informações do produto à tabela
                        ul.innerHTML += `
                    <li class='liPrint'> Produto:${nomeDoProduto} - Preço:${precoDoProduto.toFixed(2)} - Qtd:${quantidadeDoProduto}</li>
                    `;
                    });

                    // Adicionando a lista ao elemento de conteúdo
                    divContent.appendChild(ul);

                    console.log(ultimoPedido); // Faça o que precisar com o último objeto
                }
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });

    
    function printRelatorio(divContent) {
        const newWindow = window.open('', '_blank');
        newWindow.document.open();

        // Escrever o conteúdo de divContent no novo documento
        newWindow.document.write('<html><head><title>Conteúdo para Impressão</title>');
        newWindow.document.write('<style>.liPrint{list-style-type: none;}.printVenda{font-size: 15px;width: 450px;height: 450px;background-color: white;border: 1px solid gray;color: rgb(0, 0, 0);border-radius: 10px;left: 350px;top: 10px;text-align: center;align-items: center;justify-content: center;padding: 5px;}</style>');
        newWindow.document.write('</head><body>');
        newWindow.document.write(divContent.innerHTML);
        newWindow.document.write('</body></html>');
        newWindow.document.close();

        // Chamar o método de impressão no novo documento
        newWindow.print();
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
            const msg = 'Insira o valor recebido em dinheiro.';
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
        // atualizarRelatorio()
        printRelatorio(divContent)
        limparInputEAN();
        enviarRelatorio()
        inputCPF.value = 1
        carrinho.length = 0;
        lista.innerHTML = '';
        dinheiroCliente.value = '',
        trocoCli.innerText = '',
        totalCarrinho.innerHTML = '0.00';
    });

    const formaPagamento2 = document.getElementById('forma-pagamento');
    const divPagamento = document.querySelector('.divPagamento');
    const spanPagamento = document.querySelector('.spanPagamento');

    formaPagamento2.addEventListener('change', function () {        
        if (formaPagamento2.value === 'PIX' || formaPagamento2.value === 'Cartao') {
            divPagamento.classList.remove('divPagamento');     
            divPagamento.classList.add('display');      
            spanPagamento.classList.remove('spanPagamento');     
            spanPagamento.classList.add('display');      
        } else {
            divPagamento.classList.remove('display');  
            divPagamento.classList.add('divPagamento');
            spanPagamento.classList.add('spanPagamento'); 
            spanPagamento.classList.remove('display'); 
            
        }
    });

})

