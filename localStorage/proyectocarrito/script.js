let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
    
}
document.getElementById("vaciar-carrito").addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        actualizaseCarrito();
    }

    carrito = [];
    total = 0;
    actualizarCarrito();
    document.getElementById("formulario-pago").style.display = "none";
});


function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    let lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    carrito.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} - ${item.precio}€`;
        
        // Botón de eliminar con estilo específico
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "eliminar";
        botonEliminar.onclick = function() {
            eliminarDelCarrito(index);
        };
        
        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
    document.getElementById("total").textContent = total;
}

function mostrarFormulario() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    } else {
        document.getElementById("formulario-pago").style.display = "block";
    }
}

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
        document.getElementById("formulario-pago").style.display = "none"; // Ocultar el formulario después de la compra
    } else {
        alert("Por favor, completa todos los campos.");
    }
    window.onload = function() {
        actualizarCarrito();
    };
});
