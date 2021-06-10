const socket = io();
var datos = [];
var tipo = 'bar';
var total = 0;
var grafico;
var recibido;

//VALIDACIÓN DE DATOS DE TODOS LOS CAMPOS
function validacion() {
    for (i = 0; i < 12; i++) {
        var campo = "campo";
        campo = campo + i;
        var elemento = document.getElementById(campo);

        if (elemento.value.length > 3) {
            elemento.value = "";
            console.log("X")
        }

        if (elemento.value < 0 || elemento.value > 100) {
            elemento.value = "";
            console.log("X");
        } 

        if (elemento.value.charAt(0) == 0 && elemento.value.length > 1 ) {
            elemento.value = "";
            console.log("X");
        }
    }
}

function campos() {
    for (i = 0; i < 12; i++) {
        var campo = "campo" + i;
        var elemento = document.getElementById(campo);
        if (elemento.value > 0 || elemento.value < 101 && elemento.value != 0) {
             datos.push(elemento.value);
        }
    }
    return datos;
}

function setCampos() {
    datos = [];
    datos = campos();
    socket.emit('guardar campos', datos);
    console.log('Enviando campos al servidor ' + datos);
}

function getCampos(){
    socket.emit('llamada campos');
    console.log("Llamando al servidor para los campos")
    socket.on('devolver campos', function(serCampos) {
        console.log('Servidor devolviendo campos: ' + serCampos);
        datos = serCampos;
        for (i = 0; i < 12; i++) {
            var campo = "campo";
            campo = campo + i;
            var elemento = document.getElementById(campo);
            elemento.value = datos[i];
        }
    });
}

function setMedia() {
    total = media();
    if (total > 0) {
        socket.emit('guardar media', total);
        console.log('Enviando media al servidor ' + total);
    }
}

actualizar();
function actualizar() {
    datos = [];
    datos = campos();
    total = media();
    document.getElementById('introducidos').innerHTML = "Datos introducidos: " + datos.length;
    document.getElementById('recogidos').innerHTML = "Datos recogidos: " + datos;
    document.getElementById('rendimiento').innerHTML = "Rendimiento medio: " + media();
}

function media() {
    total = 0;
    datos = [];
    datos = campos();
    for (i = 0; i < datos.length; i++) {
        total += parseInt(datos[i], 10);
    }
    total = (total / datos.length).toFixed(2);
    if (isNaN(total)) {
        total = 0;
    }
    return total;
}

function previsualizar() {
    actualizar();
    total = media();

    if (total > 0) {
        crearGrafico(total);
    }
}

function crearGrafico(){
    var color;
    var bordes;
    var valores;
    var opciones;
    var html = document.getElementById('grafico');
    var container =document.getElementById('containerGrafico')
    container.className = "container mx-auto bg-dark border border-warning rounded";

    if (total < 24) {
        color = ['rgba(255, 0, 0, 0.2)'];
        bordes = ['rgba(255, 0, 0, 1)'];
    } else if (total => 25) {
        color = ['rgba(0, 255, 84, 0.2)'];
        bordes = ['rgba(0, 255, 84, 1)'];
    } else {
        color = ['rgba(255, 140, 0, 0.2)'];
        bordes = ['rgba(255, 140, 0, 1)'];
    }

    valores = {
        datasets: [{
            label: 'Rendimiento medio',
            data: [total],
            backgroundColor: color,
            borderColor: bordes,
            borderWidth: 2
        }]
    };

    opciones = {
        layout: {
            padding: 40
        },
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 30,
                fontColor: 'white'
            }
        },
        scales: {
            yAxes: [{
                barThickness: 6,
                maxBarThickness: 8,
                ticks: {
                    fontColor: "white",
                    fontSize: 15,
                    family: "Arial",
                    stepSize: 0.5,
                },
                gridLines: {
                    display: true,
                    color: "grey", 
                }
            }], 
            xAxes: [{
                barThickness: 250,
                ticks: {
                    fontColor: "white",
                    fontSize: 12,
                },
            }]
        }
    }

    grafico = new Chart(html, {
        type: tipo,
        data: valores,
        options: opciones
    });
}