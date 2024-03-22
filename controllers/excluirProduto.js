document.addEventListener('DOMContentLoaded', function () {
    
    const filtrarProduto = document.querySelector('#inputFiltar');
    const excluirProductForm = document.querySelector('#excluir')
    
    const codigoDeBarrasProduto = document.querySelector('.spanProdutosCodigo2');
    const categoriaProduto = document.querySelector('.spanProdutosCategoria2');
    const nomeProdutoInput = document.querySelector('.spanProdutosCadastroIn');
    const descricaoProduto = document.querySelector('.spanProdutosCadastroIn2');
    const selectTamanhoNumero = document.querySelector('.spanTamanhoNumero2');
    const selectTamanhoPGG = document.querySelector('.spanTamanho2');    
    const selectCor = document.querySelector('.spanCor2');

    const precoCusto = document.querySelector('.spanProdutosPrecoCusto');
    const precoProduto = document.querySelector('.spanProdutosPreco2');
    const estoqueProduto = document.querySelector('.spanProdutosEstoque2');

    const spanAlert = document.querySelector('.alert');
    const buttonAlert = document.querySelector('#bottonAlert');
    const msgAlert = document.querySelector('.msg');




    buttonAlert.addEventListener('click', criaAlert)

    function criaAlert(msg) {
        spanAlert.classList.toggle('alertDisplay')
        msgAlert.innerText = msg;
    }

    // for (var i = 1; i <= 150; i++) {
    //     var option = document.createElement("option");
    //     option.value = i;
    //     option.text = i;
    //     selectTamanhoNumero.appendChild(option);
    // }

    filtrarProduto.addEventListener('input', function (event) {
        const EANDigitado = event.target.value;
        if (EANDigitado.trim() !== '' && EANDigitado.trim() && EANDigitado.length >= 9) {
            fetchFiltrar(EANDigitado)

        }
        if (EANDigitado === '')
            console.log('Produto não encontrado.');
    });

    function fetchFiltrar(filtrarEAN) {
        const urlGetProdutoDate = 'http://204.216.187.179:3000/findProduto';


        fetch(urlGetProdutoDate, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar pedidos: ' + response.status);
            }
            return response.json();

        }).then(produtoFilter => {

            const produto = produtoFilter.find(produto => Number(produto.codigoDeBarras) === Number(filtrarEAN));

            if (produto) {
                    codigoDeBarrasProduto.innerText = produto.codigoDeBarras;
                    categoriaProduto.innerText = produto.categoria;
                    nomeProdutoInput.innerText = produto.nome;
                    descricaoProduto.innerText = produto.descricao;
                    selectTamanhoPGG.innerText = produto.tamanho === undefined ? '' : produto.tamanho;
                    selectTamanhoNumero.innerText = produto.tamanhoNumero === undefined ? '' : produto.tamanhoNumero;
                    selectCor.innerText = produto.cor === undefined ? '' : produto.cor;
                    precoCusto.innerText = Number(produto.precoCusto) === '' || isNaN(produto.precoCusto) ? '0.00' : Number(produto.precoCusto);
                    precoProduto.innerText = Number(produto.preco).toFixed(2);
                    estoqueProduto.innerText = produto.estoque;
    
                console.log(produto)
            }
        });
    }


    excluirProductForm.addEventListener('click', excluirProduto);

    function excluirProduto() {
      
        const codigoBarras = filtrarProduto.value;

        const urlUpdate = `http://204.216.187.179:3000/deleteproduto/${codigoBarras}`;

        fetch(urlUpdate, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
                'Content-Type': 'application/json'
            },
            
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar produto: ' + response.status);
                } else {
                    const msg = 'Produto excluido com sucesso!'
                    criaAlert(msg);
                    limparInputs();
                }

            })
            .catch(error => {
                console.error('Erro ao deletar o produto:', error);
            });
    }

    function limparInputs() {
        nomeProdutoInput.innerText= '';
        descricaoProduto.innerText = '';
        selectTamanhoPGG.innerText = '';
        selectTamanhoNumero.innerText = '';
        selectCor.innerText = '';
        precoCusto.innerText = '';
        precoProduto.innerText = '';
        categoriaProduto.innerText = '';
        estoqueProduto.innerText = '';
        codigoDeBarrasProduto.innerText = '';
        filtrarProduto.value= '';
    };


    const telaDeFiltar = document.querySelector('.tableProdutos2');
    const barraBtn = document.querySelector('#btnPesquisa');
    const barraBtn2 = document.querySelector('#btnPesquisa2');

    barraBtn2.addEventListener('click', () => {
        telaDeFiltar.classList.toggle('active');
        console.log('clicado');
    });
    barraBtn.addEventListener('click', () => {
        telaDeFiltar.classList.toggle('active');
        console.log('clicado');
    });


});




