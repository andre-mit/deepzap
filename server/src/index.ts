import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';

import { Message } from './models';

import UsersController from './controllers/UsersController';

import routes from './routes';

import knex from './database/connection';

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

const usersController = new UsersController;


interface UserConnect {
    socketId: string;
    userId?: string;
}

let usersConnected: UserConnect[] = [];


app.use(cors());
app.use(express.json());
app.use(routes);

io.on('connection', async (socket: SocketIO.Socket) => {
    const id = socket.handshake.query.id;


    if (usersConnected.filter(user => user.userId == id).length == 0)
        usersConnected.push({ socketId: socket.id, userId: id });
    else
        usersConnected.filter(user => user.userId = id);


    console.log(usersConnected);
    const previousMessages = await knex('messages').select('*').where({ 'sentUser': id }).orWhere({ 'receiverUser': id });
    socket.emit('previousMessages', previousMessages);


    socket.on('sendMessage', async (message: Message) => {
        const receiver = usersConnected.find(user => user.userId == message.receiverUser);
        if (receiver)
            socket.to(receiver.socketId).emit('newMessage', message);

        await knex('messages').insert(message);
    });


    socket.on('disconnect', (sockDis: SocketIO.Socket) => {
        usersConnected.splice(usersConnected.indexOf({ socketId: socket.id }), 1);
        console.log(usersConnected);
    });

});

server.listen(3333, () => {
    console.log('Server listening 3333\nsocket.io whatsapp server');
});