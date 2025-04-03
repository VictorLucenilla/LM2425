let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(productId, price) {
    const product = document.getElementById(productId);
    const productName = product.querySelector('h3').textContent;

    if (!cart[productId]) {
        cart[productId] = { name: productName, quantity: 1, price: price };
    } else {
        cart[productId].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    for (const [productId, item] of Object.entries(cart)) {
        if (item.quantity > 0) {
            const li = document.createElement('li');
            li.textContent = `${item.name} (${item.quantity}) - $${item.price * item.quantity}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = function () {
                removeFromCart(productId);
            };

            li.appendChild(removeButton);
            cartItems.appendChild(li);
            totalPrice += item.price * item.quantity;
        }
    }

    totalPriceElement.textContent = totalPrice;
}

function removeFromCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity -= 1;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function showCheckoutForm() {
    document.getElementById('checkout-form-container').style.display = 'block';
}

document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const card = document.getElementById('card').value;

    if (name && dni && email && card) {
        document.getElementById('confirmation-message').textContent = "¡Compra realizada con éxito! Gracias por tu compra.";
        localStorage.removeItem('cart');
        updateCartDisplay();
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Inicializar carrito al cargar la página
updateCartDisplay();
