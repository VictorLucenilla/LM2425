$(document).ready(function() {
    // Comprobar si hay un nombre guardado en localStorage
    let storedName = localStorage.getItem('nombre');

    if (storedName) {
        // Mostrar el mensaje de bienvenida
        mostrarMensajeBienvenida(storedName);
    }

    // Manejar el envío del formulario
    $('#formularioNombre').submit(function(event) {
        event.preventDefault(); // Evitar el envío normal del formulario
        let nombre = $('#nombre').val().trim();

        if (nombre) {
            localStorage.setItem('nombre', nombre); // Guardar el nombre en localStorage
            mostrarMensajeBienvenida(nombre); // Mostrar el mensaje de bienvenida
            $('#nombre').val(''); // Limpiar el campo de entrada
        } else {
            alert("Por favor, introduce tu nombre.");
        }
    });

    // Función para mostrar el mensaje de bienvenida
    function mostrarMensajeBienvenida(nombre) {
        $('#mensajeBienvenida')
            .text(`¡Bienvenido, ${nombre}!`)
            .removeClass('oculto')
            .css('opacity', 0) // Inicializa la opacidad a 0
            .animate({ opacity: 1 }, 1000); // Animar la opacidad a 1
    }
});
