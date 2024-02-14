
const url = 'http://204.216.187.179:3000/findProduto';
const inputEAN = document.querySelector('#input-EAN');
const produtoEncontrado = document.querySelector('#produtoEncontrado')

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

                for (let nome of globalDataFiltrados) {
                     produtoEncontrado.innerHTML = nome.nome
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }
});

