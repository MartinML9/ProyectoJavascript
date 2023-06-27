function detectarNumero(cadena) {
    
    let caracterEsNumero;
    let trimCadena = cadena.replace(" ", "");

    for (let i = 0; i < trimCadena.length; i++) {
        caracterEsNumero = !isNaN(trimCadena[i]);
        if (caracterEsNumero) {
            return true;
        }
    }
    return false;
}

function obtenerNombreCiudad() {
    const inputCiudad = document.getElementById("ciudad");
    const nombreCiudad = inputCiudad.value.trim();
    inputCiudad.value = '';
    if (detectarNumero(nombreCiudad)) {
        alert("Ingrese una ciudad válida que no tenga numeros.");
        return null;
    }
    return nombreCiudad;
}
const boton = document.getElementById('botonFormulario');
const elementoCiudad = document.getElementById("ElementoCiudad");
const textoOriginal = elementoCiudad.innerHTML;
//boton.addEventListener("click", obtenerNombreCiudad);
boton.addEventListener("click", function() { 
    let nombreCiudad = obtenerNombreCiudad();
    if (nombreCiudad !== null && nombreCiudad !== ""){
        alert("La ciudad ingresada es " + nombreCiudad);
        elementoCiudad.innerHTML = textoOriginal;
        elementoCiudad.innerHTML += " " + nombreCiudad; 
        
    }
});

const apiKey = '';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=San%20Juan,ar&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
