var recibido;
var datos;
var total;
var grafico;
recibido = localStorage.getItem('datos');
datos = JSON.parse(recibido);
console.log(datos);

    
    //VARIABLES
    var color;
    var bordes;
    var valores;
    var opciones;
    var html = document.getElementById('grafico-final');
    total = 0;

    //FOR PARA SABER EL TOTAL Y LUEGO DIVIDIR PARA LA MEDIA
    for (var i = 0; i < datos.length; i++) {
        total += parseInt(datos[i], 10);
    }
    total = (total / datos.length).toFixed(2);
    console.log("La media es de: " + total);

    //IF PARA ASIGNAR COLOR DEPENDIENDO DEL RENDIMIENTO
    if (total < 24) {
        color = ['rgba(255, 0, 0, 0.2)'];
        bordes = ['rgba(255, 0, 0, 1)'];
    } else if (total > 25) {
        color = ['rgba(0, 255, 84, 0.2)'];
        bordes = ['rgba(0, 255, 84, 1)'];
    } else {
        color = ['rgba(255, 140, 0, 0.2)'];
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
    console.log("Valores creados");


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
                    stepSize: 0.5, //SEPARACION ENTRE EL VALOR DE LOS DATOS
                },
                //LINEAS HORIZONTALES
                gridLines: {
                    display: true,
                    color: "grey", 
                }
            }], 
            //ESCALA X
            xAxes: [{
                barThickness: 450,
                ticks: { //INFORMACIÓN DE LOS DATOS EN EL LADO Y (ARRIBA - ABAJO)
                    fontColor: "white",
                    fontSize: 12,
                },
            }]
        }
    }

    grafico = new Chart(html, {
        type: 'bar',
        data: valores,
        options: opciones
    });