const selectTamanhoNumero = document.querySelector('#tamanhoNumero');
const alterarProduto = document.querySelector('#alterarProduto')


for (var i = 1; i <= 150; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    selectTamanhoNumero.appendChild(option);
}

newProductForm.addEventListener('click', formAlterar); 

function fetchormAlterar() {

    const urlGetProdutoDate = 'http://204.216.187.179:3000/findProduto';
    const urlUpdate = `http://204.216.187.179:3000//updateProduto/:${codigoEAN}`;


    
    const nomeProduto = document.getElementById('nomeProduto').value;
    const descricaoProduto = document.getElementById('descricao').value;
    const selectTamanhoPGG = document.getElementById('tamanho').value;
    const selectTamanhoNumero = document.getElementById('tamanhoNumero').value;
    const precoCusto = document.getElementById('precoCusto').value;
    const precoProduto = document.getElementById('preco').value;
    const categoriaProduto = document.getElementById('categoria').value;
    const estoqueProduto = document.getElementById('estoque').value;
    const codigoDeBarrasProduto = document.getElementById('codigoDeBarras').value;

    function limparInputs() {
        document.getElementById('nomeProduto').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('tamanho').value = '';
        document.getElementById('tamanhoNumero').value = '';
        document.getElementById('precoCusto').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('estoque').value = '';
        document.getElementById('codigoDeBarras').value = '';
    };


}