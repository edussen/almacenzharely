const barcodeInput = document.getElementById('barcodeInput');
let barcodeBuffer = ''; // Almacenará los caracteres leídos rápidamente
let lastKeyTime = Date.now(); // Marca de tiempo del último carácter leído
let inactivityTimeout; // Variable para manejar el temporizador de inactividad

// Función para limpiar el buffer si no se presiona Enter en un tiempo determinado
function resetBufferIfNoEnter() {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastKeyTime;

    // Si el tiempo entre teclas es mayor a 100ms y no se presionó Enter
    if (timeDifference > 100 && barcodeBuffer !== '') {
        barcodeBuffer = ''; // Limpiar el buffer si no se presiona Enter
        barcodeInput.value = ''; // Limpiar el campo de entrada tambié
    }
}

// Escucha global para la lectura de teclado
document.addEventListener('keydown', function (event) {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastKeyTime; // Diferencia de tiempo entre teclas
    lastKeyTime = currentTime;

    // Reiniciar el buffer si no se presiona Enter en el tiempo adecuado
    resetBufferIfNoEnter();

    // Detectar solo teclas imprimibles
    if (event.key.length === 1) {
        // Si el tiempo entre teclas es menor a 100ms, asumimos que es un escáner
        if (timeDifference < 100) {
            barcodeBuffer += event.key;
        } else {
            // Si el tiempo fue más largo, asumimos que es un input manual y reiniciamos
            barcodeBuffer = event.key;
        }
    }

    // Detectar cuando se presiona Enter y procesar el código
    if (event.key === 'Enter') {
        if (barcodeBuffer) {
            barcodeInput.value = barcodeBuffer; // Establecer el valor en el input
            searchCustomer(); // Llamar a la función para procesar
            barcodeBuffer = ''; // Limpiar el buffer después de procesar
        }
    }
});