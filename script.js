document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificação básica de login
    if (username === 'admin' && password === '123') {
        alert('Login bem-sucedido!');
        sessionStorage.setItem('isLoggedIn', 'true'); // Marca o usuário como logado
        sessionStorage.setItem('username', username); // Armazena o nome de usuário
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginMessage').innerText = 'Usuário ou senha incorretos!';
    }
});



// Verifica se o DOM está carregado
document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Função para adicionar ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const productId = this.getAttribute("data-id");
            addToCart(productId);
        });
    });

    // Função para adicionar o produto ao carrinho
    function addToCart(productId) {
        const products = {
            1: { name: "Turbinado", price: 18.00 },
            2: { name: "X-Burguer", price: 8.00 },
            3: { name: "X-Calabresa", price: 13.00 },
            4: { name: "X-Egg Burguer", price: 15.00 },
            5: { name: "Tradicional", price: 7.00 },
            6: { name: "Calabresa Com Bacon", price: 15.00 },
            7: { name: "Big Delícia", price: 26.00 },
            8: { name: "X-Burguer Dog", price: 10.00 },
            9: { name: "X-Bacon", price: 13.00 },
            10: { name: "Egg Burguer", price: 8.00 },
            11: { name: "Guaravita", price: 2.00 }
        };

        const product = products[productId];

        if (product) {
            let cart = localStorage.getItem("cart");
            cart = cart ? JSON.parse(cart) : [];

            // Adiciona o produto ao carrinho
            cart.push(product);

            // Atualiza o localStorage com o carrinho
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${product.name} foi adicionado ao carrinho!`);
            updateCartTotal();
        } else {
            alert("Produto não encontrado!");
        }
    }

    // Função para atualizar o total no carrinho
    function updateCartTotal() {
        let cart = localStorage.getItem("cart");
        window.location.href = 'carrinho.html'; // Redireciona para a página do carrinho
        cart = cart ? JSON.parse(cart) : [];

        const total = cart.reduce((sum, product) => sum + product.price, 0);
        console.log(`Total do carrinho: R$ ${total.toFixed(2)}`);
    }
});
