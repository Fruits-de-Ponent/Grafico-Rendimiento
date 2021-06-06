//IMPORT
const express = require('express');
var path = require('path')
const app = express();
const port = 5000;

//STATICS PARA LOS ARCHIVOS PUBLICOS
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/style.css'))
app.use('/js', express.static(__dirname + 'chart.js'))
 

app.get('',(req, res)  => {
    res.sendFile(__dirname + '/public/actualizarGrafico.html')
})


//LISTEN EN EL PUERTO 5000
app.listen(port, () => console.log(`Example app listening on port:${port}`))















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