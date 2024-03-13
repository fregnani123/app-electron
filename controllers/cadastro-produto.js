
const newProductForm = document.querySelector('#cadastrar');
const produtoCadastrado = document.querySelector('#alert');
const codigoEAN = document.querySelector('#codigoEAN');
const filtrarProdutos = document.querySelector('#produtoFiltrados');


codigoEAN.addEventListener('input', function (event) {
    const EANDigitado = event.target.value;
    buscarProdutoEAN(EANDigitado)
});

function buscarProdutoEAN (filtrar) {
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
    }).then(DataFilter => { console.log(DataFilter)
          produtoFilter = DataFilter.find(produto => Number(produto.codigoDeBarras) === Number(filtrar))
        if (produtoFilter) {
            console.log(produtoFilter)
        }
    })

}

// filtrarProdutos.addEventListener('input', filterCategoria);

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
    const precoProduto = document.getElementById('preco').value;
    const categoriaProduto = document.getElementById('categoria').value;
    const estoqueProduto = document.getElementById('estoque').value;
    const codigoDeBarrasProduto = document.getElementById('codigoDeBarras').value;

    function limparInputs() {
        document.getElementById('nomeProduto').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('estoque').value = '';
        document.getElementById('codigoDeBarras').value = '';
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
                preco: precoProduto,
                categoria: categoriaProduto,
                estoque: estoqueProduto,
                codigoDeBarras: codigoDeBarrasProduto,
            })
        });

        if (responseNewProduct.ok) {
            console.log('Produto cadastrado com sucesso');
            limparInputs();
        } else {
            console.error('Erro ao cadastrar o produto');
        }
    } catch (error) {
        console.error('Erro:', error.message);
    }
};
