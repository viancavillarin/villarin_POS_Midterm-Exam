let orders = {};

function addToOrder(item, price, inputId) {
    const quantityInput = document.getElementById(inputId);
    const quantity = quantityInput.value;
    if (quantity > 0) {
        if (orders[item]) {
            orders[item].quantity += parseInt(quantity);
        } else {
            orders[item] = { price: price, quantity: parseInt(quantity) };
        }
        // Clear quantity input
        quantityInput.value = "";
        displayOrders();
    }
}

function displayOrders() {
    const orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';
    let total = 0;
    for (const [item, details] of Object.entries(orders)) {
        const subtotal = details.price * details.quantity;
        total += subtotal;
        // Create card for each item
        const card = document.createElement('div');
        card.classList.add('order-card');
        card.innerHTML = `
            <i class="fas fa-trash-alt delete-button" onclick="removeOrder('${item}')"></i>
            <p>${item}</p>
            <a>Qty: ${details.quantity}</a>
        `;
        orderDetails.appendChild(card);
    }
    document.getElementById('total').textContent = total + " PHP";
}

function removeOrder(item) {
    delete orders[item];
    displayOrders();
}

function calculateChange() {
    const customerCash = document.getElementById('customer-cash').value;
    const total = parseInt(document.getElementById('total').textContent);
    const change = customerCash - total;
    if (change >= 0) {
        alert(`Change: ${change} PHP\nArigatou Gozaimasu! Enjoy your food!`);
        location.reload();
    } else {
        alert('Insufficient cash!');
    }
}


