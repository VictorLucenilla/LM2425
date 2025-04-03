let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

function agregarAlCarrito(idProducto, precio) {
    const producto = document.getElementById(idProducto);
    const nombreProducto = producto.querySelector('h3').textContent;

    if (!carrito[idProducto]) {
        carrito[idProducto] = { nombre: nombreProducto, cantidad: 1, precio: precio };
    } else {
        carrito[idProducto].cantidad += 1;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarVistaCarrito();
}

function actualizarVistaCarrito() {
    const itemsCarrito = document.getElementById('items-carrito');
    const precioTotalElemento = document.getElementById('precio-total');
    itemsCarrito.innerHTML = '';
    let precioTotal = 0;

    for (const [idProducto, item] of Object.entries(carrito)) {
        if (item.cantidad > 0) {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} (${item.cantidad}) - $${item.precio * item.cantidad}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = function () {
                eliminarDelCarrito(idProducto);
            };

            li.appendChild(botonEliminar);
            itemsCarrito.appendChild(li);
            precioTotal += item.precio * item.cantidad;
        }
    }

    precioTotalElemento.textContent = precioTotal;
}

function eliminarDelCarrito(idProducto) {
    if (carrito[idProducto]) {
        carrito[idProducto].cantidad -= 1;
        if (carrito[idProducto].cantidad <= 0) {
            delete carrito[idProducto];
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarVistaCarrito();
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
        document.getElementById('mensaje-confirmacion').textContent = "¡Compra realizada con éxito! Gracias por tu compra.";
        localStorage.removeItem('carrito');
        actualizarVistaCarrito();
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

window.onload = actualizarVistaCarrito;
actualizarVistaCarrito();
