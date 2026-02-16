
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/auth', require('./routes/auth'));
app.use('/sub', require('./routes/subscription'));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', socket => {
    socket.on('joinRoom', room => socket.join(room));
    socket.on('message', data => io.to(data.room).emit('message', data));
});

app.get('/', (_, res) => res.send('Tweak Production Server Running'));

server.listen(5000, () => console.log('Server running on port 5000'));
