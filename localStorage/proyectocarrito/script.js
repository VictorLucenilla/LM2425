let carrito = [];
let total = 0;

window.onload = function() {
    // Inicializa el carrito al cargar la página
    actualizarCarrito();
};

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = ""; // Limpia la lista actual

    carrito.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} - ${item.precio}€`;
        
        // Botón para eliminar el producto del carrito
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "eliminar-btn"; // Clase para estilo
        btnEliminar.onclick = function() {
            eliminarDelCarrito(index);
        };

        li.appendChild(btnEliminar); // Añade el botón al elemento de la lista
        lista.appendChild(li); // Añade el elemento de la lista al carrito
    });

    document.getElementById("total").textContent = total;
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio; // Resta el precio del producto
    carrito.splice(index, 1); // Elimina el producto del carrito
    actualizarCarrito(); // Actualiza la lista del carrito
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
        document.getElementById("formulario-pago").style.display = "none"; // Oculta el formulario
    } else {
        alert("Por favor, completa todos los campos.");
    }
});
