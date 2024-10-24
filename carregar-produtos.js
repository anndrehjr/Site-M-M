let produtos = []; // Armazena os produtos carregados do JSON
let currentPage = 1; // Página atual
const itemsPerPage = 12; // Limite de produtos por página

// Carrega os produtos dinamicamente
fetch('produto.json')
    .then(response => response.json())
    .then(data => {
        produtos = data; // Armazena os produtos carregados
        displayProducts(currentPage, produtos); // Exibe produtos da primeira página
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));

// Função para exibir produtos da página atual
function displayProducts(page, produtosParaExibir) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = ''; // Limpa o contêiner

    const start = (page - 1) * itemsPerPage; // Calcula o índice inicial
    const end = start + itemsPerPage; // Calcula o índice final

    // Exibe produtos da página atual
    produtosParaExibir.slice(start, end).forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'container-modern';
        produtoDiv.innerHTML = `
            <h2>${produto.nome}</h2>
            <img src="${produto.imagemPequena}" alt="${produto.nome}" class="product-img zoomable" onclick="toggleZoom(this)">
            <p class="description">${produto.descricao}</p>
            <span class="price">${produto.preco}</span>
            <button class="buy-button">Comprar Agora</button>
        `;

        // Adiciona o evento de clique no botão de compra
        produtoDiv.querySelector('.buy-button').addEventListener('click', function() {
            let productName = produto.nome;
            let productPrice = produto.preco;
            let whatsappMessage = `Olá, gostaria de comprar o ${productName} por ${productPrice}`;
            
            // Codifica a mensagem para URL
            let whatsappUrl = `https://wa.me/5518981111772?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Redireciona o cliente para o WhatsApp com a mensagem pré-formatada
            window.open(whatsappUrl, '_blank');
        });

        // Adiciona o produto ao contêiner
        container.appendChild(produtoDiv);
    });

    // Atualiza o número da página
    document.getElementById('page-number').innerText = `Página ${page}`;

    // Atualiza os botões de navegação
    updateNavigationButtons(produtosParaExibir.length);
}

// Função para atualizar os botões de navegação
function updateNavigationButtons(totalProducts) {
    const totalPages = Math.ceil(totalProducts / itemsPerPage); // Calcula o total de páginas

    // Habilita ou desabilita botões conforme o número total de produtos
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    if (totalProducts > itemsPerPage) {
        prevButton.disabled = false;
        nextButton.disabled = false;
    } else {
        prevButton.disabled = true;
        nextButton.disabled = true;
    }

    // Exibe ou oculta a navegação
    const pagination = document.getElementById('pagination');
    pagination.style.display = totalPages > 1 ? 'block' : 'none';
}

// Função para filtrar os produtos
function filtrarProdutos() {
    const categoria = document.getElementById('categoria').value;
    const faixaPreco = document.getElementById('preco').value;

    const produtosFiltrados = produtos.filter(produto => {
        const precoNum = parseFloat(produto.preco.replace('R$ ', '').replace(',', '.'));

        const precoCondicional = faixaPreco === 'todos' || 
            (faixaPreco === '0-50' && precoNum <= 50) ||
            (faixaPreco === '50-100' && precoNum > 50 && precoNum <= 100) ||
            (faixaPreco === '100-200' && precoNum > 100 && precoNum <= 200) ||
            (faixaPreco === '200+' && precoNum > 200);

        // Filtra pelos tipos de produto
        return (categoria === 'todas' || produto.tipo === categoria) && precoCondicional;
    });

    displayProducts(1, produtosFiltrados); // Exibe os produtos filtrados
}

// Função para desfazer o filtro
function desfazerFiltro() {
    document.getElementById('categoria').value = 'todas'; // Reseta a categoria
    document.getElementById('preco').value = 'todos'; // Reseta a faixa de preço

    displayProducts(1, produtos); // Exibe todos os produtos
}

// Adiciona eventos aos botões
document.getElementById('filtrar').addEventListener('click', filtrarProdutos);
document.getElementById('desfazer-filtro').addEventListener('click', desfazerFiltro);

// Função para mudar de página
function changePage(direction) {
    const totalPages = Math.ceil(produtos.length / itemsPerPage); // Calcula o total de páginas
    currentPage += direction;

    // Impede a navegação além da primeira ou última página
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    displayProducts(currentPage, produtos); // Exibe os produtos da nova página

    // Rola a página para o topo com um efeito suave
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Efeito suave
    });
}

// Função para mostrar o carregador
function showLoader() {
    document.getElementById('progress-bar').style.display = 'block'; // Mostra a barra
    const progress = document.getElementById('progress');
    progress.style.width = '0'; // Reseta a largura da barra
    progress.style.animation = 'none'; // Remove a animação anterior
    setTimeout(() => {
        progress.style.animation = 'loading 1s forwards'; // Reaplica a animação
    }, 10); // Pequeno delay para reiniciar a animação
}

// Função para esconder o carregador
function hideLoader() {
    setTimeout(() => {
        document.getElementById('progress-bar').style.display = 'none'; // Oculta a barra
    }, 300); // Tempo para desaparecer
}

function toggleZoom(image) {
    image.classList.toggle('zoomed');
}
