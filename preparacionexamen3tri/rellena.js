$(document).ready(function() {

    // --- Variables Globales ---
    let currentScore = 0;
    let highScore = localStorage.getItem('mathChallengeHighScore') || 0; // Obtener récord o 0
    let num1, num2, operator, correctAnswer;
    let timerInterval;
    let timePerQuestion = 5000; // 5 segundos por pregunta (en milisegundos)
    let timeLeft = timePerQuestion;

    // --- Selectores de jQuery ---
    let $currentScoreDisplay = $('#currentScore');
    let $highScoreDisplay = $('#highScore');
    let $gameArea = $('#gameArea');
    let $problemDisplay = $('#problem');
    let $answerInput = $('#answerInput');
    let $startButton = $('#startButton');
    let $feedback = $('#feedback');
    let $timerBar = $('#timerBar');

    // --- Inicialización ---
    $highScoreDisplay.text(highScore); // Mostrar el récord al cargar

    // --- Funciones del Juego ---

    /**
     * Inicia una nueva partida.
     */
    function startGame() { // Función para iniciar el juego
        currentScore = 0;
        $currentScoreDisplay.text(currentScore);
        $feedback.html('&nbsp;').removeClass('text-red-500 text-green-500'); // Limpiar feedback
        $startButton.hide(); // Ocultar botón de inicio
        $gameArea.slideDown(); // Mostrar área de juego con animación
        generateQuestion(); // Generar la primera pregunta
    }

    /**
     * Genera una nueva pregunta matemática aleatoria.
     */
    function generateQuestion() {
        // Limpiar input y feedback anterior
        $answerInput.val('').focus(); // Limpiar y enfocar el input
        $feedback.html('&nbsp;').removeClass('text-red-500 text-green-500');

        // Generar números aleatorios (ej: entre 1 y 10)
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;

        // Seleccionar operador aleatorio (+, -, *)
        let operators = ['+', '-', '*'];
        operator = operators[Math.floor(Math.random() * operators.length)];

        // Asegurar que la resta no sea negativa (opcional, para simplificar)
        if (operator === '-' && num1 < num2) {
            [num1, num2] = [num2, num1]; // Intercambiar números si num1 es menor
        }

        // Calcular respuesta correcta
        switch (operator) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
        }

        // Mostrar la pregunta
        $problemDisplay.text(`${num1} ${operator} ${num2} = ?`);

        // Iniciar el temporizador para esta pregunta
        startTimer();
    }

    /**
     * Inicia o reinicia el temporizador para la pregunta actual.
     */
    function startTimer() {
        clearInterval(timerInterval); // Limpiar cualquier temporizador anterior
        timeLeft = timePerQuestion; // Reiniciar tiempo
        $timerBar.css('width', '100%').removeClass('bg-red-500').addClass('bg-green-500'); // Reiniciar barra de progreso

        timerInterval = setInterval(function() {
            timeLeft -= 100; // Reducir tiempo (cada 100ms para una barra más fluida)
            let percentageLeft = (timeLeft / timePerQuestion) * 100;
            $timerBar.css('width', percentageLeft + '%'); // Actualizar barra

            // Cambiar color de la barra si queda poco tiempo
            if (percentageLeft < 25) {
                $timerBar.removeClass('bg-green-500').addClass('bg-red-500');
            }

            // Si se acaba el tiempo
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleIncorrectAnswer("¡Tiempo agotado!");
            }
        }, 100);
    }

    /**
     * Comprueba la respuesta introducida por el usuario.
     */
    function checkAnswer() {
        clearInterval(timerInterval); // Detener el temporizador al responder
        let userAnswer = parseInt($answerInput.val(), 10); // Obtener respuesta como número

        if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
            // Respuesta Correcta
            currentScore++; // Aumentamos en 1 la puntuación actual
            $currentScoreDisplay.text(currentScore);
            $feedback.text('¡Correcto!').removeClass('text-red-500').addClass('text-green-500');
            // Esperar un poco antes de la siguiente pregunta
            setTimeout(generateQuestion, 800);
        } else {
            // Respuesta Incorrecta
             handleIncorrectAnswer("Incorrecto.");
        }
    }

    /**
     * Maneja una respuesta incorrecta o tiempo agotado.
     * @param {string} message - Mensaje a mostrar (ej: "Incorrecto", "Tiempo agotado").
     */
    function handleIncorrectAnswer(message) {
         $feedback.html(`${message} La respuesta era ${correctAnswer}.`).removeClass('text-green-500').addClass('text-red-500');
         endGame();  // Finaliza partida actual
    }


    /**
     * Finaliza la partida actual y actualiza el récord si es necesario.
     */
    function endGame() {
        clearInterval(timerInterval); // Asegurarse de que el timer está parado
        $gameArea.slideUp(); // Ocultar área de juego

        // Comprobar y actualizar récord
        if (currentScore > highScore) {
            highScore = currentScore;
            localStorage.setItem('mathChallengeHighScore', highScore); // Guardar nuevo récord
            $highScoreDisplay.text(highScore);
            $feedback.append(' ¡Nuevo récord!'); // Añadir mensaje de récord
        }

        $startButton.text('Jugar de Nuevo').show(); // Mostrar botón para reiniciar
    }

    // --- Manejadores de Eventos ---

    // Clic en el botón de inicio/reinicio
    $startButton.on('click', startGame);

    // Presionar Enter en el campo de respuesta
    $answerInput.on('keypress', function(event) {
        // El código 13 es la tecla Enter
        if (event.which === 13) {
            checkAnswer();
        }
    });

    // (Opcional) Añadir un botón de "Enviar" si no se quiere depender solo de Enter
    // $('<button id="submitButton" class="bg-green-500 ...">Enviar</button>').insertAfter($answerInput).on('click', checkAnswer);

}); // Fin de $(document).ready
