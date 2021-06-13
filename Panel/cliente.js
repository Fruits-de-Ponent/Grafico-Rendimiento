const socket = io();
var datos = [];
var tipo = 'bar';
var total = 0;
var grafico;
var recibido;

actualizar();
function actualizar() {
    datos = [];
    datos = campos();
    total = media();
    document.getElementById('introducidos').innerHTML = "Campos utilizados: " + datos.length;
    if (datos == 0){
        document.getElementById('recogidos').innerHTML = "Datos recogidos: 0";
    } else {
        document.getElementById('recogidos').innerHTML = "Datos recogidos: " + datos;
    }
    document.getElementById('rendimiento').innerHTML = "Rendimiento medio: " + media();
}

function validacion() {
    for (i = 0; i < 15; i++) {
        var campo = "campo";
        campo = campo + i;
        var elemento = document.getElementById(campo);

        if (elemento.value.length > 4) {
            elemento.value = "";
            console.log("X")
        }

        if (elemento.value < 0 || elemento.value > 100) {
            elemento.value = "";
            console.log("X");
        } 

        if (elemento.value.charAt(0) == 0 && elemento.value.length > 1 ) {
            elemento.value = "";
            console.log("X");s
        }
    }
    actualizar();
}

function borrarDatos() {
    document.body.style.backgroundColor = "#d53032";
    setTimeout(function(){ 
        document.body.style.backgroundColor = "#212529";
    }, 1000);
    socket.emit('borrar');
}

function campos() {
    for (i = 0; i < 15; i++) {
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
    console.log(datos.length)
    if (datos.length > 0) {
        document.body.style.backgroundColor = "#287233";
            setTimeout(function(){ 
        document.body.style.backgroundColor = "#212529";
        }, 1000);
        socket.emit('guardar campos', datos);
        console.log('Enviando campos al servidor ' + datos);
        setMedia();
    }
}

function getCampos(){
    document.body.style.backgroundColor = "#ffc107";
    setTimeout(function(){ 
        document.body.style.backgroundColor = "#212529";
    }, 1000);
    socket.emit('llamada campos');
    console.log("Llamando al servidor para los campos")
    socket.on('devolver campos', function(serCampos) {
        console.log('Servidor devolviendo campos: ' + serCampos);
        datos = serCampos;
        for (i = 0; i < 15; i++) {
            var campo = "campo";
            campo = campo + i;
            var elemento = document.getElementById(campo);
            elemento.value = datos[i];
        }
        previsualizar();
    });
}

function setMedia() {
    total = media();
    if (total > 0) {
        socket.emit('guardar media', total);
        console.log('Enviando media al servidor ' + total);
    }
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
    if (grafico != undefined || grafico !=null) {
        grafico.destroy();
    }
    var color = "";
    var bordes = "";
    var valores = "";
    var opciones = "";
    var html = document.getElementById('grafico');
    var container = document.getElementById('containerGrafico');
    container.className = "container mx-auto bg-dark border border-warning rounded";

    if (total < 24) {
        color = ['rgba(255, 0, 0, 1)'];
        bordes = ['rgba(255, 0, 0, 1)'];
    } else if (total > 25) {
        color = ['rgba(0, 255, 84, 1)'];
        bordes = ['rgba(0, 255, 84, 1)'];
    } else {
        color = ['rgba(255, 140, 0, 1)'];
        bordes = ['rgba(255, 140, 0, 1)'];
    }

    valores = {
        datasets: [{
            label: 'Rendimiento medio',
            data: [total],
            backgroundColor: color,
            borderColor: bordes,
            borderWidth: 1
        }]
    };

    opciones = {
        responsive: true,
        layout: {
            padding: 20
        },
        legend: {
            position: 'top',
            labels: {
                boxWidth: 30,
                fontColor: 'white'
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    family: "Arial",
                    fontSize: 15,
                    stepSize: 10, 
                    beginAtZero: true,
                    max: 100,
                },
                gridLines: {
                    display: true,
                    drawBorder: true,
                    color: "grey", 
                }
            }],
            xAxes: [{
                barThickness: 850,
                ticks: {
                    fontColor: "white",
                    fontSize: 12,
                },
                gridLines: {
                    display: true,
                    drawBorder: true,
                    color: "grey", 
                }
            }]
        }
    }

    grafico = new Chart(html, {
        type: 'bar',
        data: valores,
        options: opciones
    });
}