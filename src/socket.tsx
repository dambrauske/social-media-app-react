import { io, Socket } from 'socket.io-client';

let connection: Socket | undefined;

const getSocket = (): Socket => {
    if (!connection) {
        console.warn('INIT CONNECTION');
        connection = io('http://localhost:8001').connect();
        connection.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });
    }

    return connection;
};

export default getSocket;
