let carrito = [];
let total = 0;

function cambiarCantidad(nombre, cambio) {
    let cantidadElem = document.getElementById(`cantidad-${nombre}`);
    let cantidad = parseInt(cantidadElem.textContent) || 0;
    cantidad += cambio;

    if (cantidad < 0) {
        cantidad = 0; // No permitir cantidades negativas
    }

    cantidadElem.textContent = cantidad;
}

function agregarAlCarrito(nombre, precio, cantidadId) {
    let cantidad = parseInt(document.getElementById(cantidadId).textContent) || 0;

    if (cantidad > 0) {
        for (let i = 0; i < cantidad; i++) {
            carrito.push({ nombre, precio });
            total += precio;
        }
        actualizarCarrito();
        mostrarMensajeAgregado();
    } else {
        alert("Por favor, selecciona una cantidad mayor a 0.");
    }
}

document.getElementById("vaciar-carrito").addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
    } else {
        carrito = [];
        total = 0;
        actualizarCarrito();
        document.getElementById("formulario-pago").style.display = "none";
    }
});

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    let lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    
    // Crear un objeto para contar las cantidades de cada producto
    let cantidades = {};
    carrito.forEach(item => {
        if (cantidades[item.nombre]) {
            cantidades[item.nombre].cantidad += 1; // Incrementar cantidad
        } else {
            cantidades[item.nombre] = { precio: item.precio, cantidad: 1 }; // Inicializar
        }
    });

    // Mostrar cada producto con su cantidad
    for (const [nombre, { precio, cantidad }] of Object.entries(cantidades)) {
        let li = document.createElement("li");
        li.textContent = `${nombre} x${cantidad} - ${precio * cantidad}€`; // Muestra la cantidad y el total por producto
        
        // Botón de eliminar con estilo específico
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "eliminar";
        botonEliminar.onclick = function() {
            // Eliminar todos los productos de esa cantidad
            for (let i = 0; i < cantidad; i++) {
                eliminarDelCarrito(carrito.indexOf({ nombre, precio }));
            }
        };
        
        li.appendChild(botonEliminar);
        lista.appendChild(li);
    }
    
    document.getElementById("total").textContent = total;
}

function mostrarFormulario() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    } else {
        window.location.href = "finalizarcompra.html"; // Redirige a la nueva página
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
});

function mostrarMensajeAgregado() {
    let mensaje = document.getElementById("mensaje-agregado");
    mensaje.style.display = "block";
    setTimeout(() => {
        mensaje.style.display = "none";
    }, 2000);
}

function detectarTarjeta() {
    let tarjetaInput = document.getElementById("tarjeta");
    let tipoTarjeta = document.getElementById("tipo-tarjeta");
    let tarjeta = tarjetaInput.value;

    // Expresiones regulares para detectar tipos de tarjetas
    let visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    let mastercard = /^5[1-5][0-9]{14}$/;
  
    if (visa.test(tarjeta)) {
        tipoTarjeta.textContent = "Tipo de tarjeta: Visa";
    } else if (mastercard.test(tarjeta)) {
        tipoTarjeta.textContent = "Tipo de tarjeta: MasterCard";
    } else {
        tipoTarjeta.textContent = "";
    }
}
