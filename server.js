const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const startUdpServer = require('./udpServer');  // Import the UDP server function

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3210;
server.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// Start the UDP server and pass the `io` object
startUdpServer(io);
