document.addEventListener('DOMContentLoaded', function () {
    const selectTamanhoNumero = document.querySelector('#tamanhoNumero');
    const filtarProduto = document.querySelector('#inputFiltar');
    // const alterProductForm = document.querySelector('#alterar')
   

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

    
    
    function updateProduto(produto,codigoEAN) {
        const urlUpdate = `http://204.216.187.179:3000//updateProduto/:${codigoEAN}`;
        fetch(urlUpdate, {
            method: 'UPDATE',
            headers: {
                'Authorization': 'Basic ' + btoa('Freg123:Freg_1308'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto) // Converta o objeto produto para JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar produto: ' + response.status);
                }
                console.log('Produto atualizado com sucesso!');
                nomeProdutoInput.value = '';
                descricaoProdutoInput.value = '';
            })
            .catch(error => {
                console.error('Erro ao atualizar produto:', error);
            });
    }
   

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
    
                const nomeProdutoInput = document.getElementById('nomeProduto');
                const descricaoProdutoInput = document.getElementById('descricao');
                const selectTamanhoPGG = document.getElementById('tamanho');
                const selectTamanhoNumero2 = document.getElementById('tamanhoNumero');
                const precoCusto = document.getElementById('precoCusto');
                const precoProduto = document.getElementById('preco1');
                const categoriaProduto = document.getElementById('categoria');
                const estoqueProduto = document.getElementById('estoque1');
                const codigoDeBarrasProduto = document.getElementById('codigoDeBarras');
        
               const produto = produtoFilter.find(produto => Number(produto.codigoDeBarras) === Number(filtrarEAN));

                if (produto) {
                
                    nomeProdutoInput.value = produto.nome;
                    descricaoProdutoInput.value = produto.descricao;
                    selectTamanhoPGG.value = produto.tamanho;
                    selectTamanhoNumero2.value = produto.tamanhoNumero;
                    precoCusto.value = produto.precoCusto;
                    precoProduto.value = produto.preco;
                    categoriaProduto.value = produto.categoria;
                    estoqueProduto.value = produto.estoque;
                    codigoDeBarrasProduto.value = produto.codigoDeBarras;
                
                    updateProduto(produto,codigoDeBarrasProduto)
                        
                }
            });
        } 


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



    // const urlUpdate = `http://204.216.187.179:3000//updateProduto/:${codigoEAN}`;

    // const nomeProduto = document.getElementById('nomeProduto').value;
    // const descricaoProduto = document.getElementById('descricao').value;
    // const selectTamanhoPGG = document.getElementById('tamanho').value;
    // const selectTamanhoNumero = document.getElementById('tamanhoNumero').value;
    // const precoCusto = document.getElementById('precoCusto').value;
    // const precoProduto = document.getElementById('preco').value;
    // const categoriaProduto = document.getElementById('categoria').value;
    // const estoqueProduto = document.getElementById('estoque').value;
    // const codigoDeBarrasProduto = document.getElementById('codigoDeBarras').value;

    // function limparInputs() {
    //     document.getElementById('nomeProduto').value = '';
    //     document.getElementById('descricao').value = '';
    //     document.getElementById('tamanho').value = '';
    //     document.getElementById('tamanhoNumero').value = '';
    //     document.getElementById('precoCusto').value = '';
    //     document.getElementById('preco').value = '';
    //     document.getElementById('categoria').value = '';
    //     document.getElementById('estoque').value = '';
    //     document.getElementById('codigoDeBarras').value = '';
    // };

