const productos = [
    { id: 1, nombre: "Mancuernas", precio: 25, imagen: "mancuernas.jpg" },
    { id: 2, nombre: "Esteras de Yoga", precio: 15, imagen: "esteras.jpg" },
    { id: 3, nombre: "Cinta de Correr", precio: 300, imagen: "cinta.jpg" },
    { id: 4, nombre: "Bicicleta Estática", precio: 200, imagen: "bicicleta.jpg" }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

function actualizarCarritoCount() {
    const count = Object.values(carrito).reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById('carrito-count').innerText = count;
    actualizarTotalCarrito();
}

function actualizarTotalCarrito() {
    const total = Object.values(carrito).reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    document.getElementById('total-carrito').innerText = total.toFixed(2);
}

function agregarProducto(id) {
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value) || 1;
    if (carrito[id]) {
        carrito[id].cantidad += cantidad;
    } else {
        const producto = productos.find(prod => prod.id === id);
        carrito[id] = { ...producto, cantidad: cantidad };
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoCount();
}

function eliminarProducto(id) {
    delete carrito[id];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoCount();
    mostrarProductosEnCarrito();
}

function vaciarCarrito() {
    carrito = {};
    localStorage.removeItem('carrito');
    actualizarCarritoCount();
}

function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    productos.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>Precio: $${prod.precio}</p>
            <input type="number" id="cantidad-${prod.id}" value="1" min="1">
            <button onclick="agregarProducto(${prod.id})">Agregar al Carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

function mostrarProductosEnCarrito() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = ''; // Limpiar el contenedor
    for (const id in carrito) {
        const item = carrito[id];
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <h3>${item.nombre}</h3>
            <p>Precio: $${item.precio}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <button class="eliminar-btn" onclick="eliminarProducto(${id})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('compra.html')) {
        mostrarProductosEnCarrito();
    } else {
        mostrarProductos();
    }
    actualizarCarritoCount();

    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
});
