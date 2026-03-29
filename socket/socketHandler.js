// socketHandler.js

const { Server } = require('socket.io');

class SocketHandler {
    constructor(server) {
        this.io = new Server(server);
        this.setupListeners();
    }

    setupListeners() {
        this.io.on('connection', (socket) => {
            console.log('A user connected: ', socket.id);

            socket.on('disconnect', () => {
                console.log('User disconnected: ', socket.id);
            });

            // Handle messaging events
            socket.on('sendMessage', (message) => {
                this.io.emit('receiveMessage', message);
            });
        });
    }
}

module.exports = SocketHandler;
