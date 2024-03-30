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
    const produtoDescricao = document.getElementById('descricao');
    const produtoPreco = document.getElementById('preco');
    const produtoEstoque = document.getElementById('estoque');
    const totalCarrinho = document.querySelector('#total');
    const lista = document.getElementById('lista');
    const spanAlert = document.querySelector('.alert');
    const msgAlert = document.querySelector('.msg');
    const buttonAlert = document.querySelector('#bottonAlert');
    const date = document.querySelector('.date');
    const vendedor = document.getElementById('vendedor');


    const divContent = document.querySelector('.divPrint');
    date.innerText = dateVenda = new Date().toLocaleDateString();

    const carrinho = [];

    function criaAlert(msg) {
        spanAlert.classList.toggle('alertDisplay')
        msgAlert.innerText = msg;
    }

    buttonAlert.addEventListener('click', criaAlert)

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

        fetch(urlCliente, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308')
            }
        })
            .then(response => response.json())
            .then(clientes => {
                if (!cpf || cpf.trim() === '') { // Verifica se o CPF está vazio
                    clienteADD.value = 'Consumidor'; // Define "Consumidor" como o valor padrão
                    return; // Retorna para evitar a execução do código abaixo
                }

                if (Array.isArray(clientes)) {
                    clienteEncontrado = clientes.find(cliente => Number(cliente.cpf) === Number(cpf));
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
            limparInputEAN();

        } else {
            const msg = 'Nenhum produto encontrado para adicionar ao carrinho.';
            criaAlert(msg)
        }

    });

    function buscarProduto(codigoEAN) {
        const urlGetProduto = `http://204.216.187.179:3000/findProduto`;
        fetch(urlGetProduto, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308')
            }
        }).then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    produtoEncontrado = data.find(produto => Number(produto.codigoDeBarras) === Number(codigoEAN));
                    if (produtoEncontrado) {
                        produtoCodigo.value = '';
                        produtoNome.innerText = `${produtoEncontrado.nome} `;
                        produtoDescricao.innerText = `${produtoEncontrado.descricao} `;
                        produtoPreco.innerText = produtoEncontrado.preco.toFixed(2);
                        produtoEstoque.innerText = `${produtoEncontrado.estoque} ${produtoEncontrado.unidadeMedida}`;
                    } else {
                        produtoNome.innerText = 'Produto não encontrado';
                        produtoCodigo.value = ''
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

            const numeroItemCarrinho = (index + 1).toString().padStart(3, '0')
            const li = document.createElement('li');

            const spanItem = document.createElement('span');
            spanItem.classList.add('spanNumero');
            spanItem.textContent = numeroItemCarrinho;


            const spanCodigo = document.createElement('span');
            spanCodigo.classList.add('spanCodigo');
            spanCodigo.textContent = item.produto.codigoDeBarras;


            const spanNome = document.createElement('span');
            spanNome.classList.add('spanNome');
            spanNome.textContent = item.produto.nome;

            const spanDescricao = document.createElement('span');
            spanDescricao.classList.add('spanDescricao');
            spanDescricao.textContent = item.produto.descricao;

            const spanPreco = document.createElement('span');
            spanPreco.classList.add('spanPrecoNovo');
            spanPreco.innerText = Number(item.produto.preco).toFixed(2)

            const spanQtd = document.createElement('span');
            spanQtd.classList.add('spanQtd');
            spanQtd.textContent = Number(item.quantidade);

            const spanTotal = document.createElement('span');
            spanTotal.classList.add('spanQtd');
            spanTotal.textContent = Number(item.produto.preco * item.quantidade).toFixed(2);

            li.classList.add('li-carrinho');
            li.appendChild(spanItem);
            li.appendChild(spanCodigo);
            li.appendChild(spanNome);
            li.appendChild(spanDescricao);
            li.appendChild(spanPreco);
            li.appendChild(spanQtd);
            li.appendChild(spanTotal);
            lista.appendChild(li)


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
            let dinheiro = dinheiroCliente.value.replace(/\D/g, ''); // Remove tudo exceto números

            // Adiciona o ponto antes dos últimos dois dígitos
            dinheiro = dinheiro.replace(/^(\d{0,})(\d{2})$/, "$1.$2");

            // Verifica se o valor tem um ponto decimal e o primeiro caractere é zero
            if (dinheiro.includes('.') && dinheiro.charAt(0) === '0') {
                dinheiro = dinheiro.substring(1); // Remove o zero à esquerda
            }

            // Se o dinheiro terminar em ponto decimal, adicione um zero
            if (dinheiro.endsWith('.')) {
                dinheiro += '0';
            }

            // Se o dinheiro não tiver casas decimais, adicione duas casas decimais
            if (!/\./.test(dinheiro)) {
                dinheiro += '.00';
            }



            dinheiroCliente.value = parseFloat(dinheiro).toFixed(2); // Formata para duas casas decimais
            let trocoSoma = parseFloat(dinheiro) - parseFloat(total);


            return trocoCli.innerText = parseFloat(trocoSoma).toFixed(2) <= 0 ? '0.00' : parseFloat(trocoSoma).toFixed(2);
        });

    };

    function calcularTotalCarrinho(calc) {
        const total = calc.reduce((acc, item) => {
            return acc + (item.produto.preco * item.quantidade);
        }, 0);

        return total.toFixed(2);
    }

    function limparInputEAN() {
        produtoCodigo.value = ''
        produtoPreco.innerText = ''
        produtoEstoque.innerText = ''
        codigoEANInput.value = '';
        produtoNome.innerText = '';
        produtoDescricao.innerText = '';
        inputQtd.value = '1';
    }

    buttonLimparEAN.addEventListener('click', limparInputEAN);

    const urlRelatorioGet = 'http://204.216.187.179:3000/detalhes';


    fetch(urlRelatorioGet, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
        }
    }).then(res => {
        return res.json();
    }).then(dataVenda => {
        if (Array.isArray(dataVenda)) {
            dataVenda.forEach((item, index) => {
                const numeroItem = (index + 1).toString().padStart(3, '0');
                numeroPedido = Number(numeroItem);
                console.log(numeroPedido);
            });
        } else {
            console.log(dataVenda);
        }

    }).catch(error => {
        console.error('Erro na solicitação:', error);

    });

    let numeroPedido;

    function enviarRelatorio() {

        const urlRelatorio = 'http://204.216.187.179:3000/detalhesdevendaPost';
        const cliente = clienteADD.value;
        const dateVenda = new Date().toISOString(); // Convertendo para o formato ISO
        const dinheiroRecebido = dinheiroCliente.value || 0; // Definindo um valor padrão caso esteja vazio ou nulo
        const formaPagamento = selectPagamento.value;
        const totalCompra = totalCarrinho.innerHTML;
        const vendedorSelecionado = vendedor.value;
        const numeroPedidoNovo = numeroPedido + 1;



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
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numeroPedido: numeroPedidoNovo,
                carrinho: carrinhoToSend,
                cliente: cliente,
                dateVenda: dateVenda,
                dinheiroRecebido: dinheiroRecebido,
                formaPagamento: formaPagamento,
                total: totalCompra,
                vendedor: vendedorSelecionado,
            })
        }).then(response => {
            if (response.ok) {
                console.log('Relatório enviado para o MongoDB com sucesso!');
            } else {
                console.error('Erro ao enviar o relatório para o MongoDB');
                console.error('Status da resposta:', response.status);
            }
        }).catch(error => {
            console.error(error);
        });
    }

    const varImpressao = {
        cliente: '',
        dateVenda: '',
        dinheiroRecebido: '',
        formaPagamento: '',
        totalCompra: '',
        carrinhoToSend: carrinho,
        vendedor: '',
    }


    function impressaoRelatorio() {
        varImpressao.cliente = clienteADD.value;
        varImpressao.dateVenda = new Date().toISOString();
        varImpressao.dinheiroRecebido = dinheiroCliente.value || 0;
        varImpressao.formaPagamento = selectPagamento.value;
        varImpressao.totalCompra = totalCarrinho.innerHTML;
        varImpressao.vendedorSelecionado = vendedor.value;
        varImpressao.numeroPedidoPrint = numeroPedido + 1;

        const ul = document.createElement('ul');
        ul.classList.add('ulPrint');

        ul.innerHTML = `
           <li class='liPrintHeader'><img class="imgLogoLoja" src="../img/logoLoja.png" alt=""><span class='liPrintEndereco'>New
            Sun Shine Shop Service - CNPJ 07.833.865/0001-88</br> Endereço: R. Henrique Lage, 222 - Centro, Içara - SC, 88820-000 </br>Contato:
            48-3432.5672</span></li>
    <li class='liPrintInfo'>Data Pedido: ${new Date(varImpressao.dateVenda).toLocaleDateString()}</br>
        Cliente: ${varImpressao.cliente}</br>Endereço:</br>CPF:</br>Forma de Pagamento:
        ${varImpressao.formaPagamento}</br>Vendedor: ${varImpressao.vendedorSelecionado}</br><span class="totalVenda">Sub
            total: R$ ${varImpressao.totalCompra}<br />Desconto total:0.00<br/>Total: R$ ${varImpressao.totalCompra}</span>
             <span class="numero">Data impressão: ${new Date(varImpressao.dateVenda).toLocaleDateString()}<br/> nº Pedido: ${varImpressao.numeroPedidoPrint}</span>
    </li>
    <li class="borderProdutos"></li></br>
    <li class="descricaoLista"><span class="item">Item</span><span class="codigo">Código</span><span
            class="produtos">Produto - Descrição</span><span class="vlUnitario">Valor Unitário</span><span
            class="qtde">Qtde</span><span class="vlTotal">valor Total</span></li>
    `;

        carrinho.forEach((item, index) => {
            const codigoDoProduto = item.produto.codigoDeBarras;
            const nomeDoProduto = item.produto.nome;
            const descricao = item.produto.descricao;
            const precoDoProduto = item.produto.preco;
            const QtdProduto = item.quantidade;
            const subtotal = parseFloat(precoDoProduto * QtdProduto)


            // Adicionar informações do produto à lista
            const numeroItem = (index + 1).toString().padStart(3, '0'); // Formatação do número do item
            ul.innerHTML += `
           
        <li class="descricaoLista"><span class="item">${numeroItem}</span><span class="codigo">${codigoDoProduto}</span><span class="SpanProdutos"> <span class='correcaoCss'>${nomeDoProduto}</span> - ${descricao}</span><span class="vlUnitario">${precoDoProduto.toFixed(2)}</span><span
                    class="qtde">${QtdProduto}</span><span class="vlTotal">${subtotal.toFixed(2)}</span></li>
    `;
        });

        divContent.appendChild(ul);
        printRelatorio(divContent);
    }


    function printRelatorio(divContent) {

        const newWindow = window.open('', '_blank');
        newWindow.document.open();
        newWindow.document.write('<html><head><title></title>');
        newWindow.document.write(`
         <style>
        body {
            padding: 0;
            margin: 0;
        }
    
        .imgLogoLoja {
            width: 150px;
            height: auto;
            padding: 5px;
        }
    
        .divPrint {
            width: 940px;
            height: 680px;
            position: relative;
        }
    
        .ulPrint {
            height: 750px;
            width: 935px;
            margin: 0;
            padding: 0;
        }
    
        .liPrint,
        .liPrintHeader,
        .liPrintProdutos {
            margin-left: 5px;
            margin-right: 5px;
            list-style-type: none
        }
    
        .printVenda {
            font-size: 15px;
            width: 700px;
            height: 450px;
            color: #000;
            left: 350px;
            top: 10px;
            text-align: center;
            align-items: center;
            justify-content: center;
            padding: 5px
        }
    
        .liPrintHeader {
            border: 1px solid rgb(0, 0, 0);
            display: flex;
            padding: 2px;
            box-sizing: border-box;
        }
    
        .liPrintEndereco {
            align-items: center;
            color: rgb(0, 0, 0);
            width: 100%;
            font-size: 20px;
            margin-left: 15px;
            display: flex;
        }
    
        .liPrintProdutos {
            display: flex;
            box-sizing: border-box;
            margin-left: 5px;
            margin-right: 5px;
            font-size: 17px;
            padding-left: 5px;
            margin-top: 0;
            border-left: 1px solid rgb(0, 0, 0);
        }
    
        .liPrintInfo {
            display: flex;
            box-sizing: border-box;
            margin-left: 5px;
            margin-right: 5px;
            font-size: 17px;
            padding-left: 5px;
            padding-top: 10px;
            margin-bottom: -5px;
            border: 1px solid rgb(0, 0, 0);
            border-top: none;
            border-bottom: none;
        }
    
        .borderProdutos {
            border: 1px solid rgb(0, 0, 0);
            z-index: -1;
            position: absolute;
            margin-left: 5px;
            margin-right: 5px;
            height: 440px;
            width: 923px;
            border-top: none;
            list-style: none;
        }
    
        .descricaoLista {
            height: 25px;
            display: flex;
            box-sizing: border-box;
            margin-left: 5px;
            margin-right: 5px;
            font-size: 17px;
            margin-top: 0;
            align-items: center;
            margin-top: -4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    
        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 0;
            border: 1px solid rgb(0, 0, 0);
            width: 80px;
        }
    
        .codigo {
            margin-left: 0;
            border: 1px solid rgb(0, 0, 0);
            border-left: none;
            border-right: none;
            width: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    
        .SpanProdutos {
            border: 1px solid rgb(0, 0, 0);
            border-right: none;
            width: 400px;
            display: flex;
            justify-content: left;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .produtos {
            border: 1px solid rgb(0, 0, 0);
            border-right: none;
            width: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .correcaoCss{
         padding-left:10px
        }
    
        .vlUnitario {
            margin-left: 0;
            border: 1px solid rgb(0, 0, 0);
            border-right: none;
            width: 105px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    
        .qtde {
            margin-left: 0;
            border: 1px solid rgb(0, 0, 0);
            width: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    
        .vlTotal {
            margin-left: 0;
            border: 1px solid rgb(0, 0, 0);
            border-left: none;
            border-right: none;
            width: 126px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    
        .totalVenda {
            position: absolute;
            bottom: 10px;
            right: 100px;
        }
    
        .numero {
            position: absolute;
            bottom: 10px;
            left: 20px;
        }
    </style>
`);
        newWindow.document.write('</head><body>');

        const clonedContent = divContent.cloneNode(true);
        newWindow.document.body.appendChild(clonedContent);

        const images = clonedContent.querySelectorAll('img');
        let loadedImages = 0;
        images.forEach(image => {
            image.onload = function () {
                loadedImages++;
                if (loadedImages === images.length) {
                    newWindow.print();
                    newWindow.document.close();
                    newWindow.close();
                }
            };
        });

        newWindow.document.write('</body></html>');

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


        // Calcula o total da venda
        const totalVenda = parseFloat(totalCarrinho.innerHTML);

        if (dinheiroRecebido < totalVenda && formaPagamento === 'Dinheiro') {
            const msg = 'O valor recebido é menor que o total da compra.';
            criaAlert(msg);
            return;
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

        Object.values(groupedItems).forEach(item => {
            const novoEstoque = Number(item.produto.estoque) - item.quantidade;
            const urlPatchProduto = `http://204.216.187.179:3000/updateProduto/${item.produto.codigoDeBarras}`;

            fetch(urlPatchProduto, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
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
        divContent.innerHTML = ''
        impressaoRelatorio();
        limparInputEAN();
        enviarRelatorio();
        inputCPF.value = 1
        carrinho.length = 0;
        lista.innerHTML = '';
        dinheiroCliente.value = '',
            trocoCli.innerText = '',
            totalCarrinho.innerHTML = '0.00';
        setTimeout(() => {
            location.reload();
        }, 1000); // Aguarda 1 segundo antes de recarregar a página

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

