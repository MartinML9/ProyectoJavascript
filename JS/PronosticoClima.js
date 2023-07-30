const claveStorage = "cuidadesBuscadas";

function getItemHistorial(){
    document.querySelector("")
}

function showToast(message, color) {
    Toastify({
      text: message,
      duration: 1000,
      gravity: "bottom",
      position: "center",
      stopOnFocus: false,
      style: {
        background: color,
        borderRadius: "8px",
      }
    }).showToast();
  }

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

function obtenerNombreCiudad(input) {
    let nombreCiudad = inputCiudad.value.trim();
    //convertir en lowerCase y primera letra en Mayusculas
    nombreCiudad = nombreCiudad.toLowerCase().replace(/^.|\s\S/g, (match) => match.toUpperCase());
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
    if(ciudadesGuardadas === null) {
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
    if(ciudadesGuardadas != null){
        let ciudadesHTML =  "<p class='linkCiudad'>" + ciudadesGuardadas.toString().replaceAll(",","</p><p class='linkCiudad'>") + "</p>";
        historial.innerHTML="";
        historial.innerHTML = ciudadesHTML;
    }
}

function agregarEventoCargarLinkEnInput(input) {
    let elementosCiudad = document.querySelectorAll('.linkCiudad');
    elementosCiudad.forEach(elemento => {
        elemento.addEventListener('click', event => {
            input.value = event.target.innerHTML;
        });
    });
}
function agregarEventoObtenerClima() {
    let elementosCiudad = document.querySelectorAll('.linkCiudad');
    elementosCiudad.forEach(elemento => {
        elemento.addEventListener('click', event => {
            getClimaActualOnClick(event.target.innerHTML);
        });
    });
}

function getClimaActualOnClick(ciudad) {
    let coordCiudad = {};
    const nombreCiudad = ciudad;
    elementoCiudad.innerHTML = "recibiendo datos...";
    tempeturaCiudad.innerHTML = "";
    DescripcionClimaCiudad.innerHTML = "";
    HumedadCiudad.innerHTML = "";
    if (nombreCiudad !== null && nombreCiudad !== "") {
        showToast("Obteniendo datos...", "#6C757D");
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=${apiKey}&lang=es`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un error en la peticion. Código de estado: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
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
                agregarEventoCargarLinkEnInput(inputCiudad);
                agregarEventoObtenerClima();
                showToast("Datos encontrados", "#00CC66");
                console.log("Busqueda realizada con exito");
            })
            .catch(error => {
                elementoCiudad.innerHTML = error.message;
                console.log("Datos no encontrados, error: " + error.message);
                showToast("Error", "#FF6666");;
            });
    }

}

const inputCiudad = document.getElementById("ciudad");
const boton = document.getElementById('botonFormulario');
const elementoCiudad = document.getElementById("ElementoCiudad");
const tempeturaCiudad = document.getElementById("TemperaturaCiudad");
const DescripcionClimaCiudad = document.getElementById("DescripcionClimaCiudad");
const HumedadCiudad = document.getElementById("HumedadCiudad");
const historial = document.getElementById("historial");

const apiKey = '62c4f021529f44f85682ea32aed444a4';
actualizarHistorialEnHtml();
agregarEventoCargarLinkEnInput(inputCiudad);
agregarEventoObtenerClima();

boton.addEventListener("click", event => {
    event.preventDefault();
    getClimaActualOnClick(obtenerNombreCiudad(inputCiudad));
});


