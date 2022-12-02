const WebSocket = require('ws');
const url = require('url');

const wss = new WebSocket.Server({ port: 8084 });

wss.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;
    const port = req.connection.remotePort;
    const clientName = ip + ":" + port;

    console.log("contented" + clientName);

    ws.on('message', function incoming(message) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
