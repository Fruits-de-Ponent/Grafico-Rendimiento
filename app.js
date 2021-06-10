const { type } = require('os');

//IMPORT
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var serMedia = 0;
var serCampos = [];
var grafico = "";


//STATICS PARA LOS ARCHIVOS PUBLICOS
app.get('/panel', (req, res) => {
    res.sendFile(__dirname + '/Panel/panel.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Panel/panel.html');
});

app.get('/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/socket.io/socket.io.js');
});
  
app.get('/background.css', (req, res) => {
      res.sendFile(__dirname + '/Panel/background.css');
});
  
app.get('/cliente.js', (req, res) => {
      res.sendFile(__dirname + '/Panel/cliente.js');
});
  
app.get('/grafico', (req, res) => {
    res.sendFile(__dirname + '/Grafico/index.html');
});

app.get('/grafico.js', (req, res) => {
    res.sendFile(__dirname + '/Grafico/grafico.js');
});


io.on('connection', (socket) => {
    console.log("Cliente " +  socket.id.substring(0,4) + " conectado");

    socket.on('disconnect', () => {
        console.log("Cliente " + socket.id.substring(0,4) + " desconectado");
    });

    socket.on('prueba', () => {
        console.log("Prueba llamada");
    });

    socket.on('guardar media', function(cliMedia){
        serMedia = cliMedia;
        console.log('Media guardada: ' + serMedia);
    });

    socket.on('guardar campos', function(cliCampos){
        serCampos = cliCampos;
        console.log('Campos guardados: ' + serCampos)
    })

    socket.on('llamada media', () => {
            console.log('Enviando media ' + serMedia)
            socket.emit('devolver media', serMedia);
    });

    socket.on('llamada campos', () => {
        console.log('Enviando campos ' + serCampos)
        socket.emit('devolver campos', serCampos);
    });
});

http.listen(port, () => {
    console.log('¡Servidor encendido!');
    console.log(`http://localhost:${port}`);
});