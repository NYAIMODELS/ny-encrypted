const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve a static HTML file for the client
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
