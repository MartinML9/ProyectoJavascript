function detectarNumero(cadena) {
    for (let i = 0; i < cadena.length; i++) {
        if (!isNaN(cadena[i])) {
            return true;
        }
    }
    return false;
}

function obtenerNombreCiudad() {
    const inputCiudad = prompt("ciudad");
    const nombreCiudad = inputCiudad.trim();
    if (detectarNumero(nombreCiudad)) {
        alert("Ingrese una ciudad válida que no tenga numeros.");
        return null;
    }
    return nombreCiudad;
}

alert("La ciudad ingresada es " + obtenerNombreCiudad());
