// Validación del formulario de registro para Conexión+

document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('registro-form');
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');
    let errorMessage = document.getElementById('error-message');
    let successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let usernameValue = username.value.trim();
        let emailValue = email.value.trim();
        let passwordValue = password.value.trim();
        let confirmPasswordValue = confirmPassword.value.trim();

        // Limpiar mensajes previos
        errorMessage.textContent = '';
        successMessage.textContent = '';

        // Validaciones
        if (!usernameValue || !emailValue || !passwordValue || !confirmPasswordValue) {
            errorMessage.textContent = 'Por favor, completa todos los campos.';
            return;
        }

        if (!validateEmail(emailValue)) {
            errorMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
            return;
        }

        if (passwordValue.length < 8) {
            errorMessage.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            return;
        }

        if (passwordValue !== confirmPasswordValue) {
            errorMessage.textContent = 'Las contraseñas no coinciden.';
            return;
        }

        // Mensaje de éxito
        successMessage.textContent = '¡Registro exitoso! Bienvenido a Conexión+';
        form.reset();
    });

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }
});