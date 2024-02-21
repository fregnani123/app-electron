document.addEventListener('DOMContentLoaded', function () {
    const buttonAddCarrinho = document.getElementById('buttonAddCarrinho');
    const codigoEANInput = document.getElementById('input-EAN');
    const inputQtd = document.getElementById('input-qtd');
    const produtoCodigo = document.getElementById('codigo');
    const produtoNome = document.getElementById('produto');
    const produtoPreco = document.getElementById('preco');
    const produtoEstoque = document.getElementById('estoque');
    const totalCarrinho = document.getElementById('total');
    const lista = document.getElementById('lista');
    const carrinho = [];
    let produtoEncontrado = null;
    
    
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
            li.textContent = `${item.produto.nome} - Quantidade: ${item.quantidade} - Preço: R$ ${(item.produto.preco * item.quantidade).toFixed(2)}`;

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
            console.log(carrinho)
            li.appendChild(buttonExcluir);
            lista.appendChild(li);
        });
    };

    function calcularTotalCarrinho() {
        const total = carrinho.reduce((acc, item) => {
            return acc + (item.produto.preco * item.quantidade);
        }, 0);

        return total.toFixed(2);
    }

});
