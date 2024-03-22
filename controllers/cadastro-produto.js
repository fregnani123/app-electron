document.addEventListener('DOMContentLoaded', function () {
    const newProductForm = document.querySelector('#cadastrar');
    // const produtoCadastrado = document.querySelector('#alert');
    const codigoEAN = document.querySelector('#codigoEAN');
    const filtrarProdutos = document.querySelector('#produtoFiltrados');
    const ulLista = document.querySelector('#listaProdutoFilter');
    const liDes = document.querySelector('.descricaoLista0');
    const selectTamanhoNumero = document.querySelector('#tamanhoNumero');



    for (var i = 1; i <= 150; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectTamanhoNumero.appendChild(option);
    }


    codigoEAN.addEventListener('input', function (event) {
        const EANDigitado = event.target.value;
        if (EANDigitado.trim() !== '' && EANDigitado.trim() && EANDigitado.length >= 9) {
            filterEAN(EANDigitado)
        }
        if (EANDigitado === '')
            limparUlLista();
    }

    );

    filtrarProdutos.addEventListener('input', function (event) {
        const filtrarProdutos = event.target.value;
        filterCategoria(filtrarProdutos)

    });

    function filterCategoria(filtrar) {
        const urlGetProdutoDate = 'http://204.216.187.179:3000/findProduto';
        fetch(urlGetProdutoDate, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308')
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar pedidos: ' + response.status);
            }
            return response.json();
        }).then(DataFilter => {
            produtoFilter = DataFilter.filter(produto => produto.categoria === filtrar)

            if (produtoFilter) {
                renderizaLista()
            }

        })

    }

    function filterEAN(filtrarEAN) {

        const urlGetProdutoDate = 'http://204.216.187.179:3000/findProduto';
        fetch(urlGetProdutoDate, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308')
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar pedidos: ' + response.status);
            }
            return response.json();
        }).then(DataFilter => {
            produtoFilter = DataFilter.filter(produto => Number(produto.codigoDeBarras) === Number(filtrarEAN))
            console.log(produtoFilter)
            if (produtoFilter) {
                renderizaLista()
            }
        })

    }

    function limparUlLista() {
        ulLista.innerHTML = '';
        ulLista.appendChild(liDes);
    }

    function renderizaLista() {

        ulLista.innerHTML = '';

        ulLista.appendChild(liDes);

        produtoFilter.forEach((item, index) => {

            const numeroItemProduto1 = (index + 1).toString().padStart(3, '0')
            const li1 = document.createElement('li');


            const spanItem1 = document.createElement('span');
            spanItem1.classList.add('spanItem');
            spanItem1.textContent = numeroItemProduto1;

            const spanCodigo1 = document.createElement('span');
            spanCodigo1.classList.add('codigo0');
            spanCodigo1.textContent = item.codigoDeBarras;

            const spanProdutos1 = document.createElement('span');
            spanProdutos1.classList.add('produtos');
            spanProdutos1.textContent = item.nome;

            const spanDescricao1 = document.createElement('span');
            spanDescricao1.classList.add('descricaoList0');
            spanDescricao1.textContent = item.descricao;

            const spanCategiria1 = document.createElement('span');
            spanCategiria1.classList.add('categoriaLista');
            spanCategiria1.textContent = item.categoria;

            const spanTamanhoPG = document.createElement('span');
            spanTamanhoPG.classList.add('tamanhoPG');
            spanTamanhoPG.textContent = item.tamanhoPG;

            const spanTamanhoNum = document.createElement('span');
            spanTamanhoNum.classList.add('tamanhoNum');
            spanTamanhoNum.textContent = item.tamanhoNumeracao;

            const spanPrecoCompra1 = document.createElement('span');
            spanPrecoCompra1.classList.add('precoCusto');
            spanPrecoCompra1.textContent = Number(item.precoCusto).toFixed(2);;

            const spanPrecoVenda1 = document.createElement('span');
            spanPrecoVenda1.classList.add('precoVenda');
            spanPrecoVenda1.textContent = Number(item.preco).toFixed(2);

            const spanEstoque1 = document.createElement('span');
            spanEstoque1.classList.add('spanEstoque');
            spanEstoque1.textContent = item.estoque;

            li1.classList.add('descricaoLista2')
            li1.appendChild(spanItem1);
            li1.appendChild(spanCodigo1);
            li1.appendChild(spanProdutos1);
            li1.appendChild(spanDescricao1);
            li1.appendChild(spanCategiria1);
            li1.appendChild(spanTamanhoPG);
            li1.appendChild(spanTamanhoNum);
            li1.appendChild(spanPrecoCompra1);
            li1.appendChild(spanPrecoVenda1);
            li1.appendChild(spanEstoque1);

            ulLista.appendChild(li1)

        })

    }

    const spanAlert = document.querySelector('.alert');
    const msgAlert = document.querySelector('.msg');
    const btnAlert = document.querySelector('#bottonAlert');

    btnAlert.addEventListener('click', criaAlert)

    function criaAlert(msg) {

        spanAlert.classList.toggle('alertDisplay')
        msgAlert.innerText = msg;
    }

    newProductForm.addEventListener('click', formCadastrar);

    async function formCadastrar() {
        console.log('clicado')

        const urlGetProdutoDate = 'http://204.216.187.179:3000/findProduto';
        const urlNewProduct = 'http://204.216.187.179:3000/newProduto';


        const nomeProduto = document.getElementById('nomeProduto').value;
        const descricaoProduto = document.getElementById('descricao').value;
        const selectTamanhoPGG = document.getElementById('tamanho').value;
        const selectTamanhoNumero = document.getElementById('tamanhoNumero').value;
        const precoCusto = document.getElementById('precoCusto').value;
        const precoProduto = document.getElementById('preco1').value;
        const categoriaProduto = document.getElementById('categoria').value;
        const estoqueProduto = document.getElementById('estoque1').value;
        const codigoDeBarrasProduto = document.getElementById('codigoDeBarras').value;
        const medidaMassaValor = document.getElementById('massaNumero').value === '' ? '0' : document.getElementById('massaNumero').value;
        const medidaMassaDescricao = document.getElementById('massa').value;
        const selectVolumeValor = document.getElementById('volumeNumero').value;
        const selectVolumeDescricao = document.getElementById('volume').value;
        const cor = document.getElementById('cor').value;



        function limparInputs() {
            document.getElementById('nomeProduto').value = '';
            document.getElementById('descricao').value = '';
            document.getElementById('tamanho').value = '';
            document.getElementById('tamanhoNumero').value = '';
            document.getElementById('precoCusto').value = '';
            document.getElementById('preco1').value = '';
            document.getElementById('categoria').value = '';
            document.getElementById('estoque1').value = '';
            document.getElementById('codigoDeBarras').value = '';
            document.getElementById('massaNumero').value = '';
            document.getElementById('massa').value = '';
            document.getElementById('volumeNumero').value = '';
            document.getElementById('volume').value = '';
            document.getElementById('cor').value = '';
        };

        try {
            // Baixar os dados dos produtos
            const response = await fetch(urlGetProdutoDate, {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao obter os produtos');
            }

            const data = await response.json(); console.log(data)

            // Verificar se o código de barras já existe nos produtos baixados
            const codigoDeBarrasExiste = data.some(produto => Number(produto.codigoDeBarras) === Number(codigoDeBarrasProduto.trim()));

            if (codigoDeBarrasExiste) {
                const msg = 'Erro: O código de barras já existe no banco de dados.'
                criaAlert(msg);
            }

            // Se o código de barras não existir, podemos prosseguir com a inserção do novo produto

            const responseNewProduct = await fetch(urlNewProduct, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nomeProduto,
                    descricao: descricaoProduto,
                    tamanhoPG: selectTamanhoPGG,
                    tamanhoNumeracao: selectTamanhoNumero,
                    precoCusto: precoCusto,
                    preco: precoProduto,
                    categoria: categoriaProduto,
                    medidaMassaValor: medidaMassaValor,
                    medidaMassaDescricao: medidaMassaDescricao,
                    estoque: estoqueProduto,
                    codigoDeBarras: codigoDeBarrasProduto,
                    volumeDescricao: selectVolumeDescricao,
                    volumeValor: selectVolumeValor,
                    cor:cor,
                })
            });

            if (responseNewProduct.ok) {
                const msg = 'Produto cadastrado com sucesso';
                criaAlert(msg)
                limparInputs();
            } else {
                console.error('Erro ao cadastrar o produto');
            }
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    const telaDeFiltar = document.querySelector('.tableProdutos2');
    const barraBtn = document.querySelector('#btnPesquisa');
    const barraBtn2 = document.querySelector('#btnPesquisa2');


    barraBtn2.addEventListener('click', () => {
        telaDeFiltar.classList.toggle('active');
        console.log('clicado')
    })
    barraBtn.addEventListener('click', () => {
        telaDeFiltar.classList.toggle('active');
        console.log('clicado')
    })



})  
