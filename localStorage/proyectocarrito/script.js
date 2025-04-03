let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

function añadirAlCarrito(idProducto, precio) {
    const producto = document.getElementById(idProducto);
    const nombreProducto = producto.querySelector('h3').textContent;

    if (!carrito[idProducto]) {
        carrito[idProducto] = { nombre: nombreProducto, cantidad: 1, precio: precio };
    } else {
        carrito[idProducto].cantidad += 1;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const articulosCarrito = document.getElementById('articulos-carrito');
    const totalPrecioElemento = document.getElementById('precio-total');
    articulosCarrito.innerHTML = '';
    let totalPrecio = 0;

    for (const [idProducto, item] of Object.entries(carrito)) {
        if (item.cantidad > 0) {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} (${item.cantidad}) - ${item.precio * item.cantidad}€`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = function () {
                eliminarDelCarrito(idProducto);
            };

            li.appendChild(botonEliminar);
            articulosCarrito.appendChild(li);
            totalPrecio += item.precio * item.cantidad;
        }
    }

    totalPrecioElemento.textContent = totalPrecio;
}

function eliminarDelCarrito(idProducto) {
    if (carrito[idProducto]) {
        carrito[idProducto].cantidad -= 1;
        if (carrito[idProducto].cantidad <= 0) {
            delete carrito[idProducto];
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }
}

function mostrarFormularioPago() {
    document.getElementById('contenedor-formulario-pago').style.display = 'block';
}

document.getElementById('formulario-pago').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const tarjeta = document.getElementById('tarjeta').value;

    if (nombre && dni && email && tarjeta) {
        document.getElementById('mensaje-confirmacion').textContent = "¡Pedido realizado con éxito! Gracias por tu compra.";
        localStorage.removeItem('carrito');
        actualizarCarrito();
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

window.onload = actualizarCarrito;
