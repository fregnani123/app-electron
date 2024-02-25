const newProductForm = document.getElementById('productForm');
const produtoCadastrado = document.querySelector('#alert');

newProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlGetProdutoDate = 'http://204.216.187.179:3000/findProduto';
    const urlNewProduct = 'http://204.216.187.179:3000/newProduto';

    // Aqui estão as variáveis para obter os valores dos campos do formulário
    const nomeProduto = document.getElementById('nomeProduto').value;
    const descricaoProduto = document.getElementById('descricao').value;
    const precoProduto = document.getElementById('preco').value;
    const categoriaProduto = document.getElementById('categoria').value;
    const estoqueProduto = document.getElementById('estoque').value;
    const codigoDeBarrasProduto = document.getElementById('codigoDeBarras').value;

    // Função para limpar os campos do formulário
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
        const response = await fetch(urlGetProdutoDate);
        if (!response.ok) {
            throw new Error('Erro ao obter os produtos');
        }

        const data = await response.json(); console.log(data)

        // Verificar se o código de barras já existe nos produtos baixados
        const codigoDeBarrasExiste = data.some(produto => Number(produto.codigoDeBarras) === Number(codigoDeBarrasProduto.trim()));
        
        if (codigoDeBarrasExiste) {
            alert('Erro: O código de barras já existe no banco de dados.');
            return;
        }

        // Se o código de barras não existir, podemos prosseguir com a inserção do novo produto
       
        const responseNewProduct = await fetch(urlNewProduct, {
            method: 'POST',
            headers: {
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
});
