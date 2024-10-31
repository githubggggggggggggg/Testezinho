// Área Administrativa - JavaScript

document.addEventListener("DOMContentLoaded", function() {
    // Funções para gerenciamento de pedidos
    loadOrders();
    loadDeliverers();

    // Event listeners para botões
    document.getElementById("addDelivererBtn").addEventListener("click", addDeliverer);
    document.getElementById("createCouponBtn").addEventListener("click", createCoupon);
    document.getElementById("recoverSalesBtn").addEventListener("click", recoverSales);
    document.getElementById("scheduleOrderBtn").addEventListener("click", scheduleOrder);
    document.getElementById("supportOnlineBtn").addEventListener("click", openSupport);
});

// Função para carregar pedidos
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersContainer = document.getElementById("ordersContainer");
    ordersContainer.innerHTML = ""; // Limpa o container

    if (orders.length === 0) {
        ordersContainer.innerHTML = "<p>Nenhum pedido encontrado.</p>";
    } else {
        orders.forEach(order => {
            ordersContainer.innerHTML += `
                <div class="order" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                    <p><strong>ID do Pedido:</strong> ${order.id}</p>
                    <p><strong>Total:</strong> R$ ${order.total}</p>
                    <p><strong>Data:</strong> ${order.date}</p>
                    <p><strong>Itens:</strong></p>
                    <ul>
                        ${order.items.map(item => `<li>${item.name} - R$ ${item.price.toFixed(2)} (Quantidade: ${item.quantity || 1})</li>`).join('')}
                    </ul>
                </div>
            `;
        });
    }
}

// Função para carregar entregadores
function loadDeliverers() {
    const deliverers = JSON.parse(localStorage.getItem("deliverers")) || [];
    const deliverersContainer = document.getElementById("deliverersContainer");
    deliverersContainer.innerHTML = "";

    if (deliverers.length === 0) {
        deliverersContainer.innerHTML = "<p>Nenhum entregador cadastrado.</p>";
    } else {
        deliverers.forEach(deliverer => {
            deliverersContainer.innerHTML += `
                <div class="deliverer">
                    <p>Nome: ${deliverer.name}</p>
                    <p>Contato: ${deliverer.contact}</p>
                </div>
            `;
        });
    }
}

// Função para adicionar entregador
function addDeliverer() {
    const name = document.getElementById("delivererName").value;
    const contact = document.getElementById("delivererContact").value;

    if (!name || !contact) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const deliverers = JSON.parse(localStorage.getItem("deliverers")) || [];
    deliverers.push({ name, contact });
    localStorage.setItem("deliverers", JSON.stringify(deliverers));

    document.getElementById("delivererName").value = "";
    document.getElementById("delivererContact").value = "";
    loadDeliverers();
}

// Função para criar cupons
function createCoupon() {
    const couponCode = document.getElementById("couponCode").value;
    const discountValue = document.getElementById("discountValue").value;

    if (!couponCode || !discountValue) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Simular criação de cupom (deve ser substituído por chamada a API)
    alert(`Cupom ${couponCode} criado com desconto de R$${discountValue}.`);
}

// Função para recuperar vendas
function recoverSales() {
    // Simulação da recuperação de vendas (deve ser substituído por chamada a API)
    alert("Vendas recuperadas com sucesso!");
}

// Função para agendar pedidos
function scheduleOrder() {
    // Lógica de agendamento (deve ser substituído por chamada a API)
    alert("Pedido agendado com sucesso!");
}

// Função para abrir suporte online
function openSupport() {
    // Lógica para abrir suporte online (pode ser um modal ou link para chat)
    alert("Suporte online aberto!");
}
