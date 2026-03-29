'use strict';

const socketIO = require('socket.io');

class SocketService {
    constructor(server) {
        this.io = socketIO(server);
        this.setupEvents();
    }

    setupEvents() {
        this.io.on('connection', (socket) => {
            console.log('A user connected: ' + socket.id);

            // Handle message event
            socket.on('message', (message) => {
                console.log('Message received: ', message);
                // Broadcast message to all clients
                this.io.emit('message', message);
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                console.log('User disconnected: ' + socket.id);
            });
        });
    }
}

module.exports = SocketService;
