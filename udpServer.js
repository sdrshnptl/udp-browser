const dgram = require('dgram');
const udpServer = dgram.createSocket('udp4');

function startUdpServer(io) {
  udpServer.on('message', (msg, rinfo) => {
    const timestamp = new Date().toISOString();
    console.log(`UDP message from ${rinfo.address}:${rinfo.port} at ${timestamp} - ${msg}`);
    io.emit('udp message', {
      message: msg.toString(),
      ip: rinfo.address,
      timestamp: timestamp
    });
  });

  udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`UDP Server listening on ${address.address}:${address.port}`);
  });

  udpServer.bind(41234);  // Bind to port 41234
}

module.exports = startUdpServer;
