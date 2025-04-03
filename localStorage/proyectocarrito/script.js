let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    carrito.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} - ${item.precio}€`;
        lista.appendChild(li);
    });
    document.getElementById("total").textContent = total;
}

// Mostrar formulario al hacer clic en "Finalizar Compra"
function mostrarFormulario() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    } else {
        document.getElementById("formulario-pago").style.display = "block";
    }
}

// Manejo del formulario de pago
document.getElementById("formPago").addEventListener("submit", function (e) {
    e.preventDefault();
    
    let nombre = document.getElementById("nombre").value;
    let dni = document.getElementById("dni").value;
    let email = document.getElementById("email").value;
    let tarjeta = document.getElementById("tarjeta").value;

    if (nombre && dni && email && tarjeta) {
        document.getElementById("mensaje").textContent = "¡Compra realizada con éxito! Gracias por tu compra.";
        carrito = [];
        total = 0;
        actualizarCarrito();
    } else {
        alert("Por favor, completa todos los campos.");
    }
});
