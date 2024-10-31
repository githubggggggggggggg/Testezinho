document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById("cartItems");
    console.log(cartItemsContainer); // Verifique se está retornando o elemento
    
    const cartTotal = document.querySelector(".cart-total h3");
    console.log(cartTotal); // Verifique este também

    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    const deliveryFee = 0; // Defina o valor da taxa de entrega

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>O carrinho está vazio.</p>";
    } else {
        renderCartItems(cart);
        updateCartTotal(cart);
    }

    function removeItemFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems(cart);
        updateCartTotal(cart);
    }

    function renderCartItems(cart) {
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>O carrinho está vazio.</p>";
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="cardapio.png" alt="Produto" class="cart-item-img">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Preço: R$ ${item.price.toFixed(2)}</p>
                    <p>Quantidade: <input type="number" value="${item.quantity || 1}" min="1" data-index="${index}" class="item-quantity"></p>
                    <button class="remove-item" data-index="${index}">Remover</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                removeItemFromCart(index);
            });
        });

        document.querySelectorAll(".item-quantity").forEach(input => {
            input.addEventListener("change", function() {
                const index = this.getAttribute("data-index");
                const newQuantity = parseInt(this.value);
                cart[index].quantity = newQuantity;

                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartTotal(cart);
            });
        });
    }

    function applyDiscount(total) {
        const appliedCoupon = localStorage.getItem('appliedCoupon');
        let discount = 0;

        const cuponsDisponiveis = {
            'CUPOM10': 0.10, // 10% de desconto
            'FRETEGRATIS': 0 // Não aplica desconto no total
        };

        if (appliedCoupon && cuponsDisponiveis[appliedCoupon] !== undefined) {
            if (total >= 50) {
                discount = cuponsDisponiveis[appliedCoupon];
            } else {
                alert("O cupom só pode ser aplicado em compras acima de R$50.");
            }
        }

        return total * (1 - discount);
    }

    function updateCartTotal(cart) {
        const total = cart.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0);
        const totalComDesconto = applyDiscount(total);

        // Aplica a taxa de entrega se o total for menor que R$80
        const finalTotal = totalComDesconto < 80 ? totalComDesconto + deliveryFee : totalComDesconto;
        cartTotal.innerText = `Total: R$ ${finalTotal.toFixed(2)}`;
    }

    let purchaseInProgress = false;

    const finalizeButton = document.getElementById("checkout");
    if (finalizeButton) {
        finalizeButton.addEventListener("click", function() {
            if (purchaseInProgress) return;

            purchaseInProgress = true;

            if (cart.length === 0) {
                alert("O carrinho está vazio. Adicione itens antes de finalizar o pedido.");
                purchaseInProgress = false;
                return;
            }

            // Armazena o carrinho antes do redirecionamento, se necessário
            localStorage.setItem("cart", JSON.stringify(cart));

            // Redirecionar para checkout.html
            window.location.href = "checkout.html";
        });
    }

    const continueShoppingButton = document.getElementById("continueShopping");
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener("click", function() {
            window.location.href = "index.html";
        });
    }
});
