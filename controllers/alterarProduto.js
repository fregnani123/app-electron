document.addEventListener('DOMContentLoaded', function () {
    const filtrarProduto = document.querySelector('#inputFiltar');
    const tamanhoNumeracao = document.querySelector('#tamanhoNumero');
    const alterProductForm = document.querySelector('#alterar')
    const nome = document.getElementById('nomeProduto');
    const descricao = document.getElementById('descricao');
    const tamanhoPG = document.getElementById('tamanho');
    const cor = document.getElementById('cor');
    const precoCusto = document.getElementById('precoCusto1');
    const preco = document.getElementById('preco1');
    const categoria = document.getElementById('categoria');
    const estoque = document.getElementById('estoque1');
    const codigoDeBarras = document.getElementById('codigoDeBarras');
    const medidaMassaValor = document.getElementById('massaNumero');
    const medidaMassaDescricao = document.getElementById('massa');
    const volumeValor = document.getElementById('volumeNumero');
    const volumeDescricao = document.getElementById('volume');
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
        tamanhoNumeracao.appendChild(option);
    }

    filtrarProduto.addEventListener('input', function (event) {
        EANDigitado = event.target.value;
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

                nome.value = produto.nome;
                descricao.value = produto.descricao;
                precoCusto.value = produto.precoCusto;
                preco.value = produto.preco;
                categoria.value = produto.categoria;
                estoque.value = produto.estoque;
                medidaMassaValor.value = produto.medidaMassaValor;
                medidaMassaDescricao.value = produto.medidaMassaDescricao;
                volumeDescricao.value = produto.volumeDescricao;
                volumeValor.value = produto.volumeValor;
                tamanhoPG.value = produto.tamanhoPG;
                tamanhoNumeracao.value = produto.tamanhoNumeracao;
                cor.value = produto.cor;

                console.log(produto)
            }
        });
    }

    alterProductForm.addEventListener('click', updateProduto);

    function updateProduto() {

        const urlUpdate = `http://204.216.187.179:3000/updateProduto/${EANDigitado}`;

        const nome1 = nome.value
        const descricao1 = descricao.value
        const precoCusto1 = precoCusto.value
        const preco1 = preco.value
        const categoria1 = categoria.value
        const estoque1 = estoque.value
        const codigoDeBarras1 = codigoDeBarras.value
        const medidaMassaValor1 = medidaMassaValor.value
        const medidaMassaDescricao1 = medidaMassaDescricao.value
        const volumeDescricao1 = volumeDescricao.value
        const volumeValor1 = volumeValor.value
        const tamanhoPG1 = tamanhoPG.value
        const tamanhoNumeracao1 = tamanhoNumeracao.value
        const cor1 = cor.value

        const produto = {
            nome: nome1,
            descricao: descricao1,
            precoCusto: precoCusto1,
            preco: preco1,
            categoria: categoria1,
            estoque: estoque1,
            codigoDeBarras: codigoDeBarras1,
            medidaMassaValor: medidaMassaValor1,
            medidaMassaDescricao: medidaMassaDescricao1,
            volumeDescricao: volumeDescricao1,
            volumeValor: volumeValor1,
            tamanhoPG: tamanhoPG1,
            tamanhoNumeracao: tamanhoNumeracao1,
            cor: cor1,
        };



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
        nome.value = '';
        descricao.value = '';
        tamanhoPG.value = '';
        tamanhoNumeracao.value = '';
        cor.value = '';
        precoCusto.value = '';
        preco.value = '';
        categoria.value = '';
        estoque.value = '';
        codigoDeBarras.value = '';
        medidaMassaValor.value = '';
        medidaMassaDescricao.value = '';
        volumeValor.value = '';
        volumeDescricao.value = '';
        filtrarProduto.value = ''
    }



});




