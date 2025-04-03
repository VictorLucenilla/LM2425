// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || {};

function updateQuantity(productId, change) {
    if (!cart[productId]) cart[productId] = 0;
    cart[productId] += change;
    if (cart[productId] < 0) cart[productId] = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalItems = 0;
    for (const [productId, quantity] of Object.entries(cart)) {
        if (quantity > 0) {
            const li = document.createElement('li');
            li.textContent = `${productId}: ${quantity}`;
            cartItems.appendChild(li);
            totalItems += quantity;
        }
    }
    document.getElementById('cart-count').textContent = totalItems;
}

function clearCart() {
    cart = {};
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// Validación del formulario
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const card = document.getElementById('card').value;

    if (name && dni && email && card) {
        document.getElementById('confirmation-message').textContent = "Compra realizada con éxito.";
    } else {
        alert("Por favor, complete todos los campos.");
    }
});

// Inicializar carrito al cargar la página
updateCartDisplay();
