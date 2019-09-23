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
var connections = {}; // Used to keep track of the connections
var socketQueue = []; // Used to pair sockets together

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// The rate in milliseconds at which the server checks if there is another chatter to pair
const checkRate = 50;

// A flag to do proper matching
let matching = false;

async function matchSockets() {
  if (socketQueue.length < 2) {
    throw 'Short Socket Queue error';
  } else {

    // Get the first two sockets in the queue
    let socket1 = socketQueue[0];
    let socket2 = socketQueue[1];

    // Then remove them from the queue
    socketQueue.shift();
    socketQueue.shift();

    // console.log("sockers2", socketQueue.map(sock => sock.id));

    // Emit to each of them we found a chatter and send the respecive ID to them
    socket1.emit('chatterFound', [socket2.id, connections[socket2.id].username]);
    socket2.emit('chatterFound', [socket1.id, connections[socket1.id].username]);

    // Set the 'connection' status and info
    connections[socket1.id].pair = socket2.id;
    connections[socket2.id].pair = socket1.id;

    // console.log("sockers", Object.keys(connections).map(key => `${key} -> ${connections[key].pair}`));

    // Let other things get paired
    matching = false;
  }

}

io.on('connection', function(socket) {
  // console.log('Connected', socket.id);
  socket.emit('init', socket.id);   // When we first start, make sure the frontend has its ID

  // Getting the data structure of socket id's
  connections[socket.id] = {
    socket: socket,
    pair: null
  };

  socket.on('connect', function(data) {
    connections[socket.id] = data;
    socketQueue.push(socket.id);
  });

  socket.on('disconnect', function() {
    // *** First make sure that we have the matching socket taken care of
    // console.log('DIS', socket.id);
    if (connections[connections[socket.id].pair]){
      connections[connections[socket.id].pair].socket.emit('left')
    }

    // Once done, remove the connection from our connections bar and from the socket queue
    delete connections[socket.id];
    socketQueue.filter(sock => sock.id != socket.id);
  });

  socket.on('getChatPartner', async function(username) {
    connections[socket.id].username = username; // Add the new info to the connection
    socketQueue.push(socket);

    // Make sure we don't try to match unless we already have one...
    while (matching) {
      await new Promise(resolve => setTimeout(resolve, checkRate));
    }

    // getPartnerSocket(socketId);
    if (socketQueue.length >= 2) {
      matching = true;
      await matchSockets();
    }

    // If we're pairing, this process is already being done on this end.
    // *** Emit an error if it takes too long to pair
  });

  // Simply forwards the message to the correct recipient
  socket.on('newMessage', function(msg) {
    connections[connections[socket.id].pair].socket.emit('newMessage', msg);
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
  res.json(Object.keys(connections).map(key => `Socket: ${key} --- Pair: ${connections[key].pair}`));
});
// ***