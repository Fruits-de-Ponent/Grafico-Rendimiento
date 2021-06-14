const { type } = require('os');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var serMedia = 0;
var serCampos = [];
var usuario;

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
  
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/Grafico/index.html');
});

app.get('/grafico.js', (req, res) => {
    res.sendFile(__dirname + '/Grafico/grafico.js');
});

io.on('connection', (socket) => {
    var date = new Date();
    if (parseInt(date.getMinutes()) < 10) {minutes = "0" + date.getMinutes();} else minutes = date.getMinutes();
    if (parseInt(date.getSeconds()) < 10) {seconds = "0" + date.getSeconds();} else seconds = date.getSeconds();
    date = date.getHours() + ":" + minutes + ":" + seconds + " 🡪  ";
    usuario = socket.id.substring(0,4);
    console.log(date + 'Cliente ' +  usuario + ' conectado');

    socket.on('disconnect', () => {
        console.log(date + 'Cliente ' + usuario + " desconectado");
    });

    socket.on('borrar', () => {
        console.log(date + usuario + ' ha borrando datos');
        serCampos = 0;
        serMedia = 0;
    });

    socket.on('guardar media', function(cliMedia){
        serMedia = cliMedia;
        console.log(date + usuario + ' ha guardado la media ' + serMedia);
    });

    socket.on('guardar campos', function(cliCampos){
        serCampos = cliCampos;
        console.log(date + usuario + ' ha guardado los campos ' + serCampos)
    })

    socket.on('llamada media', () => {
            console.log(date + usuario + ' ha pedido la media ' + serMedia);
            socket.emit('devolver media', serMedia);
    });

    socket.on('llamada campos', () => {
        console.log(date + usuario + ' ha pedido los campos ' + serCampos);
        socket.emit('devolver campos', serCampos);
    });
});

http.listen(port, () => {
    console.log('¡Servidor encendido! ' + `serveruser:${port}`+'/panel' + '\n');
});