document.addEventListener('DOMContentLoaded', function () {
    const filtarProduto = document.querySelector('#inputFiltar');
    let selectTamanhoNumero = document.querySelector('#tamanhoNumero');
    const alterProductForm = document.querySelector('#alterar')
    let nomeProdutoInput = document.getElementById('nomeProduto');
    let descricaoProdutoInput = document.getElementById('descricao');
    let selectTamanhoPGG = document.getElementById('tamanho');
    let selectCor = document.getElementById('cor');
    let precoCusto = document.getElementById('precoCusto1');
    let precoProduto = document.getElementById('preco1');
    let categoriaProduto = document.getElementById('categoria');
    let estoqueProduto = document.getElementById('estoque1');
    let codigoDeBarrasProduto = document.getElementById('codigoDeBarras');
    const spanAlert = document.querySelector('.alert');
    const buttonAlert = document.querySelector('#bottonAlert');
    const msgAlert = document.querySelector('.msg');


    

    buttonAlert.addEventListener('click', criaAlert)

    function criaAlert(msg) {
        spanAlert.classList.toggle('alertDisplay')
        msgAlert.innerText = msg;
    }

   

    for (var i = 1; i <= 150; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectTamanhoNumero.appendChild(option);
    }

    filtarProduto.addEventListener('input', function (event) {
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
                nomeProdutoInput.value = produto.nome;
                descricaoProdutoInput.value = produto.descricao;
                selectTamanhoPGG.value = produto.tamanho;
                selectTamanhoNumero.value = produto.tamanhoNumero;
                selectCor.value = produto.cor === '' ? 'Padrão' : produto.cor;
                precoCusto.value = Number(produto.precoCusto) === '' || isNaN(produto.precoCusto) ? '0.00' : Number(produto.precoCusto);
                precoProduto.value = produto.preco;
                categoriaProduto.value = produto.categoria;
                estoqueProduto.value = produto.estoque;
                codigoDeBarrasProduto.value = produto.codigoDeBarras;

                console.log(produto)
            }
        });
    }

 
    alterProductForm.addEventListener('click', updateProduto);

    function updateProduto() {
        const nome = nomeProdutoInput.value;
        const descricao = descricaoProdutoInput.value;
        const PGG = selectTamanhoPGG.value;
        const TN = selectTamanhoNumero.value;
        const cor = selectCor.value;
        const PCusto = precoCusto.value;
        const PP = precoProduto.value;
        const categoriaP = categoriaProduto.value;
        const estoqueProdutoNovo = estoqueProduto.value;
        const codigoBarrasNovo = codigoDeBarrasProduto.value;

        const produto = {
            nome: nome,
            descricao: descricao,
            tamanhoPG: PGG,
            tamanhoNumeracao: TN,
            cor: cor,
            precoCusto: PCusto,
            preco: PP,
            categoria: categoriaP,
            estoque: estoqueProdutoNovo,
            codigoDeBarras: codigoBarrasNovo,
        };

        const urlUpdate = `http://204.216.187.179:3000/updateProduto/${codigoBarrasNovo}`;

        fetch(urlUpdate, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar produto: ' + response.status);
                } else {
                    const msg = 'Produto atualizado com sucesso!'
                    criaAlert(msg);
                    limparInputs();
                }
                 
            })
            .catch(error => {
                console.error('Erro ao atualizar produto:', error);
            });
    }

    function limparInputs() {
        nomeProdutoInput.value = '';
        descricaoProdutoInput.value = '';
        selectTamanhoPGG.value = '';
        selectTamanhoNumero.value = '';
        selectCor.value = '';
        precoCusto.value = '';
        precoProduto.value = '';
        categoriaProduto.value = '';
        estoqueProduto.value = '';
        codigoDeBarrasProduto.value = '';
        filtarProduto.value = '';
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




