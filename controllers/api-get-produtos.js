
const url = 'http://204.216.187.179:3000/findProduto';
const inputEAN = document.querySelector('#input-EAN');
const codigoEAN = document.querySelector('#codigo');
const produtoEncontrado = document.querySelector('#produtoEncontrado');
const preco = document.querySelector('#preco');
const estoque = document.querySelector('#estoque');


inputEAN.addEventListener('input', function () {
    const codigo = inputEAN.value.trim();
    console.log(codigo);
    if (codigo !== '') {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const globalData = data;
                console.log(globalData);

                const globalDataFiltrados = globalData.filter(item => {
                    return Number(item.codigoDeBarras) === Number(codigo);
                });
                console.log(globalDataFiltrados)

                for (let item of globalDataFiltrados) {
                    codigoEAN.innerHTML = item.codigoDeBarras;
                    produtoEncontrado.innerHTML = item.nome;
                    preco.innerHTML = item.preco.toFixed(2);
                    estoque.innerHTML = item.estoque;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }
});

