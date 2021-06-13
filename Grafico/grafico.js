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
