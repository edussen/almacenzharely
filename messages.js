function mostrarError(mensaje, tipo) {
    var errorContainer = document.getElementById("error-container");

    // Crear elemento de notificación
    var errorElement = document.createElement("div");
    errorElement.className = "error-message " + tipo;
    errorElement.innerText = mensaje;

    // Agregar elemento al contenedor de errores
    errorContainer.appendChild(errorElement);

    // Eliminar la notificación después de cierto tiempo
    setTimeout(function () {
        errorElement.remove();
    }, 5000); // 5000 milisegundos = 5 segundos
}