document.addEventListener('DOMContentLoaded', function () {
    const filtrarProduto = document.querySelector('#inputFiltar');
    // const tamanhoNumeracao = document.querySelector('#tamanhoNumero');
    const alterProductForm = document.querySelector('#alterar')
    const nome = document.getElementById('nomeProduto1');
    const descricao = document.getElementById('descricao1');
    // const tamanhoPG = document.getElementById('tamanho');
    // const cor = document.getElementById('cor');
    const precoCusto = document.getElementById('precoCusto1');
    const preco = document.getElementById('preco1');
    // const categoria = document.getElementById('categoria');
    const estoque = document.getElementById('estoque3');
    const estoqueAdd = document.getElementById('estoque6');
    // const unidadeMedida = document.getElementById('unidade');
    // const medidaMassaValor = document.getElementById('massaNumero');
    // const medidaMassaDescricao = document.getElementById('massa');
    // const volumeValor = document.getElementById('volumeNumero');
    // const volumeDescricao = document.getElementById('volume');
    const spanAlert = document.querySelector('.alert');
    const buttonAlert = document.querySelector('#bottonAlert');
    const msgAlert = document.querySelector('.msg');
    let listaCrompra = [];


    buttonAlert.addEventListener('click', criaAlert)
    function criaAlert(msg) {
        spanAlert.classList.toggle('alertDisplay')
        msgAlert.innerText = msg;
    }

    estoqueAdd.addEventListener('input', estoqueAdicionar)

    function estoqueAdicionar () {
        estoqueCompraInput = estoqueAdd.value;
        if (!estoqueCompraInput) {
            const msg = 'Campo Adicionar Estoque não pode ser vazio.';
            criaAlert(msg);
            return;
        }
    };

    filtrarProduto.addEventListener('input', function (event) {
        EANDigitado = event.target.value;
            estoqueCompraInput = estoqueAdd.value;
    
        if (EANDigitado.trim() !== '' && EANDigitado.trim() && EANDigitado.length >= 9) {
            fetchFiltrar(EANDigitado)

        }
        if (EANDigitado === '')
            console.log('Produto não encontrado.');
        
        if (EANDigitado.trim() !== '') {
            limparInputs();
        }

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
          console.log(produto)
            if (produto) {
                
                nome.value = produto.nome;
                descricao.value = produto.descricao;
                precoCusto.value = Number(produto.precoCusto).toFixed(2);
                preco.value = Number(produto.preco).toFixed(2);
                categoria = produto.categoria;
                estoque.value = Number(produto.estoque);
                medidaMassaValor = produto.medidaMassaValor === null ? 0 : produto.medidaMassaValor;
                medidaMassaDescricao = produto.medidaMassaDescricao;
                volumeDescricao = produto.volume === '' ? '' : produto.volume;
                volumeValor = produto.volumeValor === null ? 0 : produto.volumeValor;
                tamanhoPG = produto.tamanhoPG === '' ? '' : produto.tamanhoPG;
                tamanhoNumeracao = produto.tamanhoNumeracao === null ? 0 : produto.tamanhoNumeracao;
                cor = cor = 'cor' in produto ? produto.cor : '';
                unidadeMedida = produto.unidadeMedida;
        
                
            }
        });
    }

    alterProductForm.addEventListener('click', updateProduto);


    function updateProduto() {
      

        const urlUpdate = `http://204.216.187.179:3000/updateProduto/${EANDigitado}`;
        

        const nome1 = nome.value;
        const descricao1 = descricao.value;
        const precoCusto1 = precoCusto.value;
        const preco1 = preco.value;
        const categoria1 = categoria.value;
        const estoque1 = Number(estoque.value) + Number(estoqueCompraInput);
        const medidaMassaValor1 = medidaMassaValor.value;
        const medidaMassaDescricao1 = medidaMassaDescricao.value;
        const volumeDescricao1 = volumeDescricao;
        const volumeValor1 = volumeValor.value;
        const tamanhoPG1 = tamanhoPG.value;
        const tamanhoNumeracao1 = tamanhoNumeracao.value;
        const cor1 = cor.value;
        const unidadeMedida1 = unidadeMedida.value;
      
        const produto = {
            nome: nome1,
            descricao: descricao1,
            precoCusto: precoCusto1,
            preco: preco1,
            categoria: categoria1,
            estoque: estoque1,
            medidaMassaValor: medidaMassaValor1,
            medidaMassaDescricao: medidaMassaDescricao1,
            volumeDescricao: volumeDescricao1,
            volumeValor: volumeValor1,
            tamanhoPG: tamanhoPG1,
            tamanhoNumeracao: tamanhoNumeracao1,
            cor: cor1,
            unidadeMedida: unidadeMedida1,
        };
        
        listaCrompra.push(produto)
       
        console.log('Lista:',listaCrompra)

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
                } if (estoqueAdd.value === '') {
                    const msg = 'Campo Adicionar Estoque não pode estar vazio.'
                    criaAlert(msg);
                    return;
                } else {
                    const msg = 'Produto atualizado com sucesso!'
                    criaAlert(msg);
                    limparInputs();
                    filtrarProduto.value = ''
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
        estoqueAdd.value = '';
        categoria.value = '';
        estoque.value = '';
        // codigoDeBarras.value = '';
        medidaMassaValor.value = '';
        medidaMassaDescricao.value = '';
        volumeValor.value = '';
        unidadeMedida.value = ''
    }



});




