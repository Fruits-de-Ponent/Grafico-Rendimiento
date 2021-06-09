<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE = edge">
    <meta name="viewport" content="width = device-width, initial-scale = 1.0">
    <link rel="icon" href="https://www.fruitsponent.com/sites/default/files/logo/logo-200.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Panel de control - Grafico</title>
</head>
<body>
    <!-- NAVBAR -->
    <div id="navegador" class="border-bottom border-warning">
        <h5 class="flex-sm-fill text-sm-center nav-link text-warning" id="tituloNav">FRUITS DE PONENT</h5>
    </div>
<!-- PANEL SUPERIOR -->
      <div class="container-sm p-5 mt-5 bg-dark rounded mb-2 text-light border border-warning">
        <h2 class="mb-1 text-warning border-bottom border-warning">PANEL DE CONTROL DEL GRÁFICO</h1>
        <p>Introducir los rendimiento de trabajo en su correspondiente hora.</p>
        <p>Valores aceptados 0 - 100</p>
<!-- FILA 1 -->
        <div class="form-group row mb-2 col-sm-12 text-light">
          <label class="col-sm-1 col-form-label">9h-10h</label>
          <div class="col-sm-1">
            <input name="uno" type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo0" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">10h-11h</label>
          <div class="col-sm-1">
            <input name="dos" type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo1" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">11h-12h</label>
          <div class="col-sm-1">
            <input name="tres" type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo2" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">12h-13h</label>
          <div class="col-sm-1">
            <input name="cuatro" type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo3" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">13h-14h</label>
          <div class="col-sm-1">
            <input type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo4" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">14h-15h</label>
          <div class="col-sm-1">
            <input type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo5" oninput="validacionRendimiento()" placeholder="0">
          </div>
        </div>
<!-- FILA 3 -->
        <div class="form-group row mb-2 col-sm-12">
          <label class="col-sm-1 col-form-label">15h-16h</label>
          <div class="col-sm-1">
            <input type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo6" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">16h-17h</label>
          <div class="col-sm-1">
            <input type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo7" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">17h-18h</label>
          <div class="col-sm-1">
            <input type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo8" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">18h-19h</label>
          <div class="col-sm-1">
            <input type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo9" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">19h-20h</label>
          <div class="col-sm-1">
            <input type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo10" oninput="validacionRendimiento()" placeholder="0">
          </div>
          <label class="col-sm-1 col-form-label">20h-21h</label>
          <div class="col-sm-1">
            <input type="number" min="0" max="100" step="1" class="form-control border border-warning bg-dark text-light" id="campo11" oninput="validacionRendimiento()" placeholder="0">
          </div>
        </div>     
<!-- PANEL DE INFORMACIÓN --> <br>
<!-- BOTONES -->
        <div class="form-group row col-sm-12">
          <div class="p-2 text-center">
            <button class="btn border border-warning text-warning m-1 col-2" onclick="enviarDatos()">Previsualizar Gráfico</button>
            <button class="btn border border-warning text-warning m-1 col-2" disabled onclick="guardarLocalStorage()">Guardar</button>
            <button class="btn border border-warning text-warning m-1 col-2" disabled onclick="cargarLocalStorage()">Cargar</button>
            <button class="btn border border-warning text-warning m-1 col-2 " disabled onclick="borrarLocalStorage()">Borrar del sistema</button>
            <a class="btn border border-warning text-warning m-1 col-2 disabled" onclick="graficoFinal()" href="../Grafico/Grafico.php">Actualizar y ver grafico</a>
            <button class="btn border border-warning text-warning m-1" onclick="pasarMedia()">Guardar datos en JSON</button>
            <script type="text/javascript">

            function pasarMedia() {
              document.getElementById('media').innerHTML = "Hola"
              var mediaPasar = $("#media").html();
              console.log(mediaPasar);


              $.ajax({
              url: "Panel.php",
              method: "POST",
              dataType: "json",
              data: {randomAnswer: randomAnswer},
              success: function (result) {
                          alert("result: " + result);
                          $("#random").html(result);
                        }
              });
            }
            </script>
          </div>
          <div class="form-group row mb-2 col-sm-12">
              <h3>INFORMACIÓN</h3>
            </div>
          <div class="form-group row mb-2 col-sm-12">
            <span class="d-block p-2 border border-warning rounded mb-1 rounded" id="introducidos">Datos introducidos:</span>
            <span class="d-block p-2 border border-warning rounded mb-1 rounded" id="array">Datos recogidos:</span>
            <span class="d-block p-2 border border-warning rounded mb-1 rounded" name="datosMedia" id="media">Media:</span>
        </div>
        </div>
      </div>
<!-- GRÁFICO -->
    <div id="containerGrafico">
      <canvas id="grafico"></canvas>
    </div>
<!-- SCRIPTS Y FRAMEWORKS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="chart.js"></script>
</body>
</html>