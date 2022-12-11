const express = require('express');
const mongoose = require('mongoose');
var http = require('http');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const UserRoute = require('./routes/UserRoute');

var server = http.createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

app.use(express.json());
app.use(cors());

var clients = {};

io.on('connection', (socket) => {
    console.log('Connected');
    console.log(socket.id + 'has joined');

    socket.on('signin', (id) => {
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    });

    socket.on('message', (msg) => {
        console.log(msg);
        let targetId = msg.targetId;
        if(clients[targetId]) {
            clients[targetId].emit('message', msg);
        }
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log('Server running...');
});

mongoose.connect('mongodb://localhost/whatsapp', {
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to DataBase...');
}).catch((err) => {
    console.log(err.message);
});

app.use('/api/', UserRoute);