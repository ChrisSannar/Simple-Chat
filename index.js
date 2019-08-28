// server.js

var express = require('express');           // Express server
var serveStatic = require('serve-static');  // Used to get static files
var bodyParser = require('body-parser');    // Used to parse requests
var ip = require('ip');
var socket = require('socket.io');

var app = express();
app.use(serveStatic(__dirname + '/dist'));
app.use(bodyParser.json());

var addr = process.env.IP || ip.address() || 'localhost';
var port = process.env.PORT || 8080;
var server = app.listen(port);

// Get socket.io in on the party
var io = socket(server);
var connections = {};
var readySockets = [];

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// returns a socket Id for a currently open socket.
function findOpenConnection(socketId) {
  return new Promise(function(res, rej) {

    for (let i = 0; i < 1000000000; i++) {
      // do nothing/testing
    }
    res("TESTED");
    
  });
}

app.get('/connect/:socketId', async function (req, res) {
  // *** Check to see if username isn't already 

  let socketId = req.params.socketId;

  let connectedSocketId = await findOpenConnection(socketId);

  res.send(connectedSocketId);
});

io.on('connection', function(socket) {
  console.log("Connected", socket.id);
  socket.emit('init', socket.id);   // When we first start, make sure the frontend has its ID
  connections[socket.id] = {};      // Getting the data structure of socket id's

  socket.on("test", function(data) {
    console.log("Test recieved", data);
    socket.emit('temp', "tested");
  });

  socket.on('connect', function(data) {
    console.log('connect', data);
    connections[socket.id] = data;
  });

  socket.on("disconnect", function() {
    delete connections[socket.id];
    console.log("Socket Disconnected");
  });
});

// Shutdown the server and cut all current functions
function gracefulShutdown() {
    console.log();
    console.log('Starting Shutdown ...');

    // Close all chat boxes to the server
    Object.keys(io.sockets.sockets).forEach(function(s) { 
      io.sockets.sockets[s].disconnect(true);
    });

    // Once the server closes, exit
    server.close(function() {
      console.log('Shutdown complete');
      process.exit(0);
    });
  }

// Make sure to kill the proper processes when we're closing down
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

console.log('Server started on ' + addr + ':' + port);

// *** TESTING
app.get('/test', (req, res) => {
  res.json(connections);
});
// ***