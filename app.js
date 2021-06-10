//IMPORT
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
var total = 0;

//STATICS PARA LOS ARCHIVOS PUBLICOS
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/actualizarGrafico.html');
});

app.get('/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/socket.io/socket.io.js');
});
  
app.get('/style.css', (req, res) => {
      res.sendFile(__dirname + '/style.css');
});
  
app.get('/chart.js', (req, res) => {
      res.sendFile(__dirname + '/chart.js');
});
  
io.on('connection', (socket) => {
    console.log("Cliente conectado");

    socket.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    socket.on('enviando total', function(total){
        this.total = total;
        console.log(this.total);
    });
});
  
http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});











// var http = require('http');
// var fs = require('fs');
// var path = require('path');
// var express = require('express');

// var fs = require('fs');
// var http = require('http');
// var app = express();

// var publicPath = path.resolve(__dirname, 'public');
// console.log(publicPath);

// app.use(express.static(publicPath));

// app.get('/', function(req, res){
//     res.sendfile(__dirname + '/public/index.html');
// });

// http.createServer(function (request, response) {
//   response.writeHead(500, {'Content-Type': 'text/html'});
//   var file = fs.createReadStream('actualizarGrafico.html');
//   file.pipe(response);

// }).listen(8080);

// console.log('listening on port 8080...');
// console.log(`El servidor se está ejecutando`);