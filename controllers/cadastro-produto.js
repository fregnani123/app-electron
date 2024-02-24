const newProductForm = document.getElementById('productForm');
const produtoCadastrado = document.querySelector('#alert');

newProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlNewProduct = 'http://204.216.187.179:3000/newProduto';

    // Aqui estão as variáveis para obter os valores dos campos do formulário
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

    newProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const urlNewProduct = 'http://204.216.187.179:3000/newProduto';

        // Aqui estão as variáveis para obter os valores dos campos do formulário
        const nomeProduto = document.getElementById('nomeProduto').value;
        const descricaoProduto = document.getElementById('descricao').value;
        const precoProduto = document.getElementById('preco').value;
        const categoriaProduto = document.getElementById('categoria').value;
        const estoqueProduto = document.getElementById('estoque').value;
        const codigoDeBarrasProduto = document.getElementById('codigoDeBarras').value;

        fetch(urlNewProduct, {
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
        }).then(response => {
            if (response.ok) {
                console.log('Produto cadastrado com sucesso');
            } else {
                console.error('Erro ao enviar o relatório para o MongoDB');
                console.error('Status da resposta:', response.status);
            }
        }).catch(error => {
            console.error(error);
        });
    });
    fetch(urlNewProduct, {
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
    }).then(response => {
        if (response.ok) {
            console.log('Produto cadastrado com sucesso');
        } else {
            console.error('Erro ao enviar o relatório para o MongoDB');
            console.error('Status da resposta:', response.status);
        }
    }).catch(error => {
        console.error(error);
    });
    limparInputs()
});
