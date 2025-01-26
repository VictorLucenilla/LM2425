let numeros = [];

function agregarNumero() {
    let input = document.getElementById("numero").value;
    let numero = Number(input);

    if (isNaN(numero)) {
        alert("Introduce un número válido.");
        return;
    }

    numeros.push(numero);
    document.getElementById("listaNumeros").innerText = numeros.join(", ");
    document.getElementById("numero").value = "";
}

function ordenarNumeros() {
    numeros.sort((a, b) => a - b);
    document.getElementById("listaNumeros").innerText = numeros.join(", ");
}

function calcularMedia() {
    if (numeros.length === 0) {
        alert("No hay números en la lista.");
        return;
    }

    let suma = numeros.reduce((total, num) => total + num, 0);
    let media = suma / numeros.length;
    document.getElementById("media").innerText = media.toFixed(2);
}
