const deliveryFee = 4.00;

document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummaryContainer = document.getElementById("orderSummary");
    let total = 0;

    if (cart.length === 0) {
        orderSummaryContainer.innerHTML = "<p>O carrinho está vazio.</p>";
        return;
    }

    cart.forEach(item => {
        total += item.price;
        orderSummaryContainer.innerHTML += `
            <p>${item.name} - R$ ${item.price.toFixed(2)} (Quantidade: 1)</p>
        `;
    });

    document.getElementById("final-valor-total").innerText = total.toFixed(2);
});

function toggleTroco() {
    const pagamentoDinheiro = document.getElementById("pagamento-dinheiro").checked;
    document.getElementById("troco-container").style.display = pagamentoDinheiro ? 'block' : 'none';
}

function nextStep(step) {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`step-${i}`).style.display = (i === step) ? 'block' : 'none';
    }

    if (step === 5) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const finalProdutoList = document.getElementById("final-produto-list");
        finalProdutoList.innerHTML = ""; // Limpa a lista antes de preencher

        if (cart.length === 0) {
            finalProdutoList.innerHTML = "<p>Nenhum item no carrinho.</p>";
        } else {
            cart.forEach(item => {
                finalProdutoList.innerHTML += `
                    <p>${item.name} - R$ ${item.price.toFixed(2)} (Quantidade: 1)</p>
                `;
            });
        }

        // Coletando e exibindo as observações e endereço
        const observacoes = document.getElementById("observacoes").value;
        const endereco = document.getElementById("endereco").value;

        document.getElementById("final-observacoes").innerText = observacoes || "Nenhuma";
        document.getElementById("final-endereco").innerText = endereco || "Não informado";

        // Forma de Pagamento
        const formaPagamento = [];
        if (document.getElementById("pagamento-dinheiro").checked) formaPagamento.push("Dinheiro na entrega");
        if (document.getElementById("pagamento-cartao").checked) formaPagamento.push("Cartão de crédito");
        if (document.getElementById("pagamento-pix").checked) formaPagamento.push("Pix");
        if (document.getElementById("pagamento-vr").checked) formaPagamento.push("VR Refeição");

        document.getElementById("final-pagamento").innerText = formaPagamento.join(", ") || "Nenhuma forma de pagamento selecionada";

        // Verificando se precisa de troco
        const trocoValor = parseFloat(document.getElementById("troco").value) || 0;
        const totalProdutos = cart.reduce((sum, item) => sum + item.price, 0);
        const totalComTaxa = totalProdutos + deliveryFee;

        const precisaTroco = document.getElementById("pagamento-dinheiro").checked && trocoValor > 0;
        const trocoFinal = precisaTroco ? trocoValor - totalComTaxa : 0;

        // Exibindo o troco no resumo
        document.getElementById("final-troco").innerText = precisaTroco ? `Sim, R$ ${trocoFinal.toFixed(2)}` : "Não";

        // Atualizando observações com o valor total
        document.getElementById("observacoes").value += `\nTotal: R$ ${totalComTaxa.toFixed(2)}`;
    }
}

function previousStep(step) {
    nextStep(step);
}

function confirmOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderId = Date.now();
    const whatsappNumber = document.getElementById("whatsapp").value || "Não informado";
    const endereco = document.getElementById("endereco").value || "Não informado";
    const observacoes = document.getElementById("observacoes").value || "Nenhuma";

    const totalProdutos = cart.reduce((sum, item) => sum + item.price, 0);
    const totalComTaxa = totalProdutos + deliveryFee;

    const order = {
        id: orderId,
        date: new Date().toLocaleDateString(),
        total: totalComTaxa.toFixed(2),
        endereco: endereco,
        observacoes: observacoes,
        whatsapp: whatsappNumber,
        items: cart,
        status: "Aceito"
    };

    // Armazenar o pedido para o admin
    let adminOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];
    adminOrders.push(order);
    localStorage.setItem("adminOrders", JSON.stringify(adminOrders));

    fetch('http://localhost:5000/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone_number: whatsappNumber,
            order_code: orderId,
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.status);
        localStorage.removeItem("cart");
        window.location.href = "historico.html"; // Redireciona para o histórico de pedidos
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao enviar a mensagem.");
    });
}
