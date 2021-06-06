var datos = [];
var tipo = 'bar';
var total = 0;
var grafico;
var recibido;
actualizarInformacion();

function graficoFinal(){
    borrarLocalStorage();
    guardarLocalStorage();
}

//VALIDACIÓN DE DATOS DE TODOS LOS CAMPOS
function validacionRendimiento() {
    for (i = 0; i < 12; i++) {
        var campo = "campo";
        campo = campo + i;
        var elemento = document.getElementById(campo);

        //VALIDACIÓN NUMERO MAS LARGO DE 3 DÍGITOS
        if (elemento.value.length > 3) {
            elemento.value = 0;
        }

        // VALIDACIÓN DE INTERVALOS 
        if (elemento.value < 0 || elemento.value > 100) {
            elemento.value = 0;
        } 

        //VALIDACIÓN DE NUMERO EMPEZANDO POR 0
        if (elemento.value.charAt(0) == 0 && elemento.value.length > 1 ) {
            elemento.value = 0;
        }
    }
    console.log("Validado");
}

//ALMACENAMIENTO DE DATOS Y GUARDADO
function enviarDatos() {
    datos = [];
    for (i = 0; i < 12; i++) {
        var campo = "campo";
        campo = campo + i;
        var elemento = document.getElementById(campo);
        if (elemento.value > 0 || elemento.value < 101 && elemento.value != 0) {
             datos.push(elemento.value);
        }
    }

    if (datos.length != 0) {
        document.getElementById('introducidos').innerHTML = "Datos introducidos: ";
        document.getElementById('array').innerHTML = "Datos recogidos: ";
        console.log("Datos enviados");
        actualizarInformacion();
        actualizarGrafico();    
    }
}

//ACTUALIZACIÓN DE LOS DATOS DEBAJO DE LOS CAMPOS
function actualizarInformacion() {

    if(datos.length > 0){
        document.getElementById('introducidos').innerHTML = "Datos introducidos: " + datos.length;
        document.getElementById('array').innerHTML = "Datos recogidos: " + datos.toString();
    }
    if (datos == null) {
        console.log("No hay datos");
    } else { 
        document.getElementById('guardarArray').innerHTML = "Datos guardados en el sistema: " + JSON.parse(localStorage.getItem('datos'));
    }
    console.log("Datos actualizados");
}

//CREACIÓN Y EDICION DEL GRÁFICO
function actualizarGrafico() {
    //VARIABLES
    var color;
    var bordes;
    var valores;
    var opciones;
    var tipoGrafico;
    var html = document.getElementById('grafico');
    document.getElementById('containerGrafico').className = "container mx-auto bg-dark border border-warning rounded";
    
    total = 0;

    //FOR PARA SABER EL TOTAL Y LUEGO DIVIDIR PARA LA MEDIA
    for (i = 0; i < datos.length; i++) {
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
                barThickness: 250,
                ticks: { //INFORMACIÓN DE LOS DATOS EN EL LADO Y (ARRIBA - ABAJO)
                    fontColor: "white",
                    fontSize: 12,
                },
                //LINEAS VERTICALES
            }]
        }
    }
    console.log("Escalas creadas");


    grafico = new Chart(html, {
        type: tipo,
        data: valores,
        options: opciones
    });

    console.log("Grafico creado");
}

function guardarLocalStorage() {
    console.log(datos);

    if (datos.length > 0) {
        datosObjJSON = JSON.stringify(datos);
        localStorage.setItem('datos', datosObjJSON);
        console.log(localStorage);
    }
    actualizarInformacion();
}

function cargarLocalStorage() {

    if (localStorage === null) {
        console.log("No hay datos");
    } else {   
        recibido = localStorage.getItem('datos');
        datos = JSON.parse(recibido);
    } 
    if (datos.length != null && capital.length < 1) {
        for(i = 0; i < datos.length; i++) {
            var campo = "campo";
            campo = campo + i;
            var elemento = document.getElementById(campo);
            elemento.value = datos[i];
        }
    }   
}

function borrarLocalStorage() {
    localStorage.clear();
    actualizarInformacion();
}

