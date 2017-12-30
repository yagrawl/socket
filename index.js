const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const private = io.of('/private');

private.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (msg) => {
        console.log(`message: ${msg}`);
        private.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        private.emit('message', 'user disconnected');
    });
})
