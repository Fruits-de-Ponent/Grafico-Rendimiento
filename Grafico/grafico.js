const socket = io();
var total = 0;

socket.emit('llamada media');
console.log("Llamando al servidor para los campos")
socket.on('devolver media', function(serMedia) {
    console.log('Servidor devolviendo la media: ' + serMedia);
    total = serMedia;
    console.log(total);
    crearGrafico();
});

setInterval(function() {
    window.location.reload();
  }, 300000); 

function crearGrafico() {
    //VARIABLES 
    var grafico;
    var color;
    var bordes;
    var valores;
    var opciones;
    var html = document.getElementById('grafico-final');

    //IF PARA ASIGNAR COLOR DEPENDIENDO DEL RENDIMIENTO
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

    //INFORMACIÓN DEL GRAFICO
    valores = {
        datasets: [{
            label: 'Rendimiento medio',
            data: [total],
            backgroundColor: color,
            borderColor: bordes,
            borderWidth: 2
        }]
    };
    //OPCIÓNES DEL GRÁFICO
    opciones = {
        layout: {
            padding: 40 //SEPARACIÓN RESPECTO A LOS BORDES DEL CONTENEDOR
        },
        legend: { //LEYENDA Y TITULO
            display: true,
            position: 'top', //POSICION DE LA LEYENDA RESPECTO AL GRÁFICO
            labels: {
                boxWidth: 30, //ANCHO DE LA MUESTRA EN LA LEYENDA (ICONO DE COLOR)
                fontColor: 'white' //COLOR DE LA FUENTE
            }
        },
        //EDICION DE LAS ESCALAS
        scales: {
            //ESCALA Y
            yAxes: [{
                barThickness: 6,
                maxBarThickness: 8,
                ticks: { //INFORMACIÓN DE LOS DATOS EN EL LADO Y (IZQUIERDA - DERECHA)
                    fontColor: "white",
                    fontSize: 15,
                    family: "Arial",
                    stepSize: 10, //SEPARACION ENTRE EL VALOR DE LOS DATOS
                    beginAtZero: true,
                    max: 100,
                },
                //LINEAS HORIZONTALES
                gridLines: {
                    display: true,
                    color: "grey", 
                }
            }], 
            //ESCALA X
            xAxes: [{
                barThickness: 900,
                ticks: { //INFORMACIÓN DE LOS DATOS EN EL LADO Y (ARRIBA - ABAJO)
                    fontColor: "white",
                    fontSize: 12,
                },
                gridLines: {
                    display: true,
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
