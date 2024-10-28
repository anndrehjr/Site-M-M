let produtos = [];
let currentPage = 1;
const itemsPerPage = 12;

fetch('produto.json')
    .then(response => response.json())
    .then(data => {
        produtos = data;
        displayProducts(currentPage, produtos);
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));

function displayProducts(page, produtosParaExibir) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

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

        produtoDiv.querySelector('.buy-button').addEventListener('click', function() {
            let productName = produto.nome;
            let productPrice = produto.preco;
            let whatsappMessage = `Olá, gostaria de comprar o ${productName} por ${productPrice}`;
            let whatsappUrl = `https://wa.me/5518981111772?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        });

        container.appendChild(produtoDiv);
    });

    document.getElementById('page-number').innerText = `Página ${page}`;
    updateNavigationButtons(produtosParaExibir.length);
}

function updateNavigationButtons(totalProducts) {
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    const pagination = document.getElementById('pagination');
    pagination.style.display = totalPages > 1 ? 'block' : 'none';
}

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
        return (categoria === 'todas' || produto.tipo === categoria) && precoCondicional;
    });

    displayProducts(1, produtosFiltrados);
}

function desfazerFiltro() {
    document.getElementById('categoria').value = 'todas';
    document.getElementById('preco').value = 'todos';
    displayProducts(1, produtos);
}

document.getElementById('filtrar').addEventListener('click', filtrarProdutos);
document.getElementById('desfazer-filtro').addEventListener('click', desfazerFiltro);

function changePage(direction) {
    const totalPages = Math.ceil(produtos.length / itemsPerPage);
    currentPage += direction;

    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    displayProducts(currentPage, produtos);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showLoader() {
    document.getElementById('progress-bar').style.display = 'block';
    const progress = document.getElementById('progress');
    progress.style.width = '0';
    progress.style.animation = 'none';
    setTimeout(() => {
        progress.style.animation = 'loading 1s forwards';
    }, 10);
}

function hideLoader() {
    setTimeout(() => {
        document.getElementById('progress-bar').style.display = 'none';
    }, 300);
}

function toggleZoom(image) {
    const isZoomed = image.classList.contains('zoomed');
    const productImages = document.querySelectorAll('.product-img');
    productImages.forEach((img) => {
        img.classList.remove('zoomed');
    });

    if (!isZoomed) {
        image.classList.add('zoomed');
    }
}

const productImages = document.querySelectorAll('.product-img');
productImages.forEach((img) => {
    img.addEventListener('click', () => {
        toggleZoom(img);
    });
});
