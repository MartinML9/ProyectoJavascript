const claveStorage = "cuidadesBuscadas";

function detectarNumero(cadena) {

    let caracterEsNumero;
    let trimCadena = cadena.replaceAll(" ", "");

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
    console.log(nombreCiudad);
    inputCiudad.value = '';
    if (detectarNumero(nombreCiudad)) {
        alert("Ingrese una ciudad válida que no tenga numeros.");
        return null;
    }
    return nombreCiudad;
}

function gestionarStorage(ciudadBuscada) {
    const maxLength = 5;
    let ciudadesGuardadas = JSON.parse(localStorage.getItem(claveStorage));
    console.log(ciudadesGuardadas);
    if(ciudadesGuardadas===null) {
        ciudadesGuardadas = [];
    }
    if (ciudadesGuardadas.includes(ciudadBuscada)) {
        const indice = ciudadesGuardadas.indexOf(ciudadBuscada);
        ciudadesGuardadas.splice(indice, 1);
    }
    if(ciudadesGuardadas.length >= maxLength) {
        ciudadesGuardadas.pop();
    }
    ciudadesGuardadas.unshift(ciudadBuscada);
    
    localStorage.setItem(claveStorage, JSON.stringify(ciudadesGuardadas));
    
}

function actualizarHistorialEnHtml(){
    let ciudadesGuardadas = JSON.parse(localStorage.getItem(claveStorage));
    let ciudadesHTML =  "<p>" + ciudadesGuardadas.toString().replaceAll(",","</p><p>") + "</p>";
    historial.innerHTML="";
    historial.innerHTML = ciudadesHTML;
    console.log(ciudadesHTML);
}

const boton = document.getElementById('botonFormulario');
const elementoCiudad = document.getElementById("ElementoCiudad");
const tempeturaCiudad = document.getElementById("TemperaturaCiudad");
const DescripcionClimaCiudad = document.getElementById("DescripcionClimaCiudad");
const HumedadCiudad = document.getElementById("HumedadCiudad");
const historial = document.getElementById("historial");

const apiKey = '62c4f021529f44f85682ea32aed444a4';
actualizarHistorialEnHtml();

boton.addEventListener("click", function (event) {
    event.preventDefault();
    let coordCiudad = {};
    const nombreCiudad = obtenerNombreCiudad();
    if (nombreCiudad !== null && nombreCiudad !== "") {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=${apiKey}&lang=es`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ciudad Invalida");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                elementoCiudad.innerHTML = nombreCiudad;
                tempeturaCiudad.innerHTML = (data.main.temp - 273.15).toFixed(2);
                DescripcionClimaCiudad.innerHTML = data.weather[0].description;
                HumedadCiudad.innerHTML = data.main.humidity;
                coordCiudad = {
                    cityLat: data.coord.lat,
                    cityLon: data.coord.lon
                }
                gestionarStorage(nombreCiudad);
                actualizarHistorialEnHtml();
            })
            .catch(error => {
                elementoCiudad.innerHTML = error.message;
                console.log(error);
            });
    }

});


