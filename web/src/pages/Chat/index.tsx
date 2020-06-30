import React, { useState, FormEvent, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { Link } from 'react-router-dom';


const serverURL = 'http://localhost:3333';


interface Message {
    message: string;
    sentUser: string;
    receiverUser: string;
    date: Date;
}
const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const [message, setMessage] = useState('');
    const [sentUser, setSentUser] = useState('');
    const [receiverUser, setReceiverUser] = useState('');
    const [socket, setSocket] = useState<SocketIOClient.Socket>(socketIOClient);

    useEffect(() => {
        const id = sessionStorage.getItem('id');
        if(id){
            setSocket(socketIOClient(serverURL, { query: { id: id } }));

            setSentUser(id);
        }
        
        return () => {
            socket.emit('disconnect');
        }
        // eslint-disable-next-line
    }, [])


    socket.on('previousMessages', (previousmessages: Message[]) => {
        setMessages(previousmessages);
    });

    socket.on('newMessage', (message: Message) => {
        setMessages([...messages, message]);
    });

    function sendMessage(event: FormEvent) {
        event.preventDefault();

        const newMessage: Message = { message, sentUser, receiverUser, date: new Date() }
        socket.emit('sendMessage', newMessage);
        setMessages([...messages, { message, sentUser, receiverUser, date: new Date() }]);
    }

    return (
        <>
            {
                messages.map(mess => (
                    <p key={mess.message}>{mess.message}</p>
                ))
            }
            <form onSubmit={sendMessage}>
                <input type="text" placeholder="Mensagem" value={message} onChange={e => setMessage(e.target.value)} />
                <input type="text" placeholder="Destinatário" value={receiverUser} onChange={e => setReceiverUser(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>
            <Link to='/'>Voltar</Link>
        </>
    );
}

export default Chat;