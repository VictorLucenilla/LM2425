// Validación del formulario de registro para Conexión+

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registro-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();

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
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }
});