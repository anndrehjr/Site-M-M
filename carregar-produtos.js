let produtos = []; // Armazena os produtos carregados do JSON
let currentPage = 1; // Página atual
const itemsPerPage = 12; // Limite de produtos por página

// Carrega os produtos dinamicamente
fetch('produtos.json')
    .then(response => response.json())
    .then(data => {
        produtos = data; // Armazena os produtos carregados
        displayProducts(currentPage); // Exibe produtos da primeira página
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));

// Função para exibir produtos da página atual
function displayProducts(page) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = ''; // Limpa o contêiner

    const start = (page - 1) * itemsPerPage; // Calcula o índice inicial
    const end = start + itemsPerPage; // Calcula o índice final

    // Exibe produtos da página atual
    produtos.slice(start, end).forEach(produto => {
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
}

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
    displayProducts(currentPage); // Exibe os produtos da nova página

    // Rola a página para o topo com um efeito suave
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Efeito suave
    });

    showLoader(); // Mostra a barra de carregamento
    setTimeout(() => {
        displayProducts(currentPage); // Exibe os produtos da nova página
        hideLoader(); // Oculta a barra de carregamento
    }, 1000); // Tempo para simular o carregamento
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
    // Alterna a classe de zoom da imagem clicada
    image.classList.toggle('zoomed');
}

// JavaScript para controlar o preloader
let elem_preloader = document.getElementById("preloader");
setTimeout(function() {
    elem_preloader.style.display = "none";
}, 1280); // Tempo em milissegundos

// Configura o slider (Certifique-se de que jQuery e Slick estejam incluídos)
$(document).ready(function() {
    $('.carousel').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true,         // Habilita autoplay
        autoplaySpeed: 5000,    // Muda a imagem a cada 5 segundos
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
});

// Função para alternar o modo e salvar no localStorage
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('toggleModeBtn');

    // Alternar a classe 'dark-mode'
    body.classList.toggle('dark-mode');

    // Verificar se o modo escuro está ativado e salvar no localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        toggleBtn.innerHTML = '🌙'; // Alterar ícone para lua
    } else {
        localStorage.setItem('darkMode', 'disabled');
        toggleBtn.innerHTML = '🌞'; // Alterar ícone para sol
    }
}

// Verificar se o modo escuro foi ativado anteriormente e ajustar o botão
function checkDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    const toggleBtn = document.getElementById('toggleModeBtn');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleBtn.innerHTML = '🌙'; // Se modo escuro ativado, exibe lua
    } else {
        toggleBtn.innerHTML = '🌞'; // Se modo claro, exibe sol
    }
}

// Executar verificação ao carregar a página
checkDarkMode();

// Adicionar evento ao botão para alternar o modo
document.getElementById('toggleModeBtn').addEventListener('click', toggleDarkMode);

