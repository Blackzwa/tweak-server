
const WebSocket = require('ws');
const ws = new WebSocket('wss://ws.derivws.com/websockets/v3');

ws.on('open', () => console.log('Connected to Deriv WebSocket'));

ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    console.log('Received from Deriv:', data);
});

function placeTrade(symbol, stake) {
    ws.send(JSON.stringify({ symbol, stake }));
}

module.exports = { placeTrade };
