
var datos = [];
var tipo = 'bar';
var total = 0;

function cargarHoras() {
    var elementoA = document.createElement('a');
    elementoA.className = "dropdown-menu";
    elementoA.innerHTML = hora;
    
    var elementoInsertado = document.getElementById('horas');
        for (i = 0; i < 20; i++){
            elementoA.innerHTML = a + i;
            elementoInsertado.appendChild(elementoA);
        }
}

function tipoGrafico(a) {
    tipo = a;

    switch (a) {
        case "bar":
            a = "Barras";
            break;
        case "doughnut":
            a = "Donut";
            break;
        case "polarArea":
            a = "Polar";
            break;
    }
    
    document.getElementById('desplegableTipo').innerHTML = a;
}

function enviarDatos() {
    //VALIDACIÓN DE NUMERO DE NEGATIVOS
    if (parseInt(document.getElementById("campo1").value) > 0) {
        datos.push(parseInt(document.getElementById("campo1").value));
        actualizarInformacion();
    }
}

function actualizarInformacion(){
    document.getElementById('spanUno').innerHTML = datos.length;
    document.getElementById('spanDos').innerHTML = datos.toString();
}

function actualizarGrafico() {
    
    //VARIABLES
    var color;
    var valores;
    var opciones;
    var grafico;
    var tipoGrafico;
    var html = document.getElementById('grafico');

    //FOR PARA SABER EL TOTAL Y LUEGO DIVIDIR PARA LA MEDIA
    for (let i of datos) total+=i;
    total = total / datos.length;

    //IF PARA ASIGNAR COLOR DEPENDIENDO DEL RENDIMIENTO
    if (total < 24) {
        color = ['rgba(255,0,0,1)'];
    } else if (total > 25) {
        color = ['rgba(0, 255, 84, 1)'];
    } else {
        color = ['rgba(255, 140, 0, 1)']
    }

    //INFORMACIÓN DEL GRAFICO
    valores = {
        datasets: [{
            label: 'Rendimiento medio',
            data: [total],
            backgroundColor: color,
        }]
    };


    //OPCIÓNES DEL GRÁFICO
    opciones = {
        layout: {
            padding: 40
        },
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 40,
                fontColor: 'rgba(0,0,0,1)'
            }
        },
    };


    grafico = new Chart(html, {
        type: tipo,
        data: valores,
        options: opciones
    });
}


function crearJSON(){
   var archivo = new Object();
   archivo.datos = datos;
   archivo.total = total;
   var objetoJSON = JSON.stringify(archivo);
   console.log(objetoJSON);
}