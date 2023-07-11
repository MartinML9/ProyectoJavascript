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
let elementoCiudad = document.getElementById("ElementoCiudad");
const textoOriginal = elementoCiudad.innerHTML;

boton.addEventListener("click", function(event) { 
    event.preventDefault();
    let nombreCiudad = obtenerNombreCiudad();
    if (nombreCiudad !== null && nombreCiudad !== ""){
        elementoCiudad.innerHTML = textoOriginal + " " + nombreCiudad;
        alert("La ciudad ingresada es " + nombreCiudad);
    }
});

const apiKey = '62c4f021529f44f85682ea32aed444a4';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=San%20Juan,ar&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
