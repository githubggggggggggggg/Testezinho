document.addEventListener("DOMContentLoaded", function() {
    const ordersContainer = document.getElementById("ordersContainer");

    // Carregar pedidos do localStorage
    let orders = localStorage.getItem("adminOrders");
    orders = orders ? JSON.parse(orders) : [];

    // Renderizar pedidos existentes
    if (orders.length === 0) {
        ordersContainer.innerHTML += "<p>Você ainda não fez nenhum pedido.</p>";
    } else {
        orders.forEach(order => {
            renderOrder(order);
        });
    }

    function renderOrder(order) {
        const orderElement = document.createElement("div");
        orderElement.classList.add("order");
        orderElement.innerHTML = `
            <h3>Pedido #${order.id}</h3>
            <p>Data: ${order.date}</p>
            <p>Total: R$ ${order.total}</p>
            <p>Status: <strong>${order.status}</strong></p>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span class="order-item-name">${item.name}</span>
                        <span class="order-item-price">R$ ${item.price.toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <button class="reorder-button" data-order='${JSON.stringify(order.items)}'>Reordenar</button>
        `;
        ordersContainer.appendChild(orderElement);

        // Adiciona o evento para o botão "Reordenar"
        const reorderButton = orderElement.querySelector(".reorder-button");
        reorderButton.addEventListener("click", function() {
            const itemsToReorder = JSON.parse(this.getAttribute("data-order"));
            let cart = localStorage.getItem("cart");
            cart = cart ? JSON.parse(cart) : [];

            // Adiciona os itens do pedido ao carrinho
            itemsToReorder.forEach(item => {
                cart.push(item);
            });

            // Atualiza o localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Feedback para o usuário
            alert("Itens reordenados com sucesso!");
        });
    }
});
