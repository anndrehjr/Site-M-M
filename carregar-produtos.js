
// Carrega os produtos dinamicamente
fetch('produtos.json')
    .then(response => response.json())
    .then(produtos => {
        const container = document.getElementById('produtos-container');
        produtos.forEach(produto => {
            // Cria a estrutura HTML do produto
            const produtoDiv = document.createElement('div');
            produtoDiv.className = 'container-modern'; // Altera para usar sua classe
            produtoDiv.innerHTML = `
                <h2>${produto.nome}</h2>
                <img src="${produto.imagemPequena}" alt="${produto.nome}" class="product-img"onclick="toggleZoom(this)">
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
        
        // Atualiza o MagicZoom após adicionar os produtos
        MagicZoom.refresh();
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));
 function toggleZoom(image) {
        // Alterna a classe de zoom da imagem clicada
        image.classList.toggle('zoomed');
    }
// JavaScript para controlar o preloader
let elem_preloader = document.getElementById("preloader");
setTimeout(function() {
    elem_preloader.style.display = "none";
}, 1280); // Tempo em milissegundos

    // Configura o slider
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
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Verificar se o modo escuro foi ativado anteriormente
function checkDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Executar verificação ao carregar a página
checkDarkMode();

// Adicionar evento ao botão para alternar o modo
document.getElementById('toggleModeBtn').addEventListener('click', toggleDarkMode);