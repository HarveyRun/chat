const http = require('http');
const WebSocket = require('ws');
const url = require('url');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
});
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;
    const port = req.connection.remotePort;
    const clientName = ip + ":" + port;
    console.log('%s is connected', clientName)
});

server.on('upgrade', function upgrade(request, socket, head) {
    const pathquery = url.parse(request.url).query;
    let hasUserId = pathquery.split("=")[1] == "null" ? false : true;

    if (hasUserId) {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
            ws.on('message', (message) => {
                console.log("消息：", message);
                ws.send(message,{binary:false})
            })
        });
    } 
});

server.listen(7070);