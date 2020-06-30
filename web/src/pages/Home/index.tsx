import React, { useState, FormEvent } from 'react';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';


const Home: React.FC = () => {
    const history = useHistory();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function auth(event: FormEvent) {
        event.preventDefault();

        const response = await api.post('/users/login', { email, password });
        if (response.status === 200) {
            const id = response.data;
            console.log(id);
            sessionStorage.setItem('id', id);
            history.push('/chat')
        }
    }
    return (
        <form onSubmit={auth}>
            <h1>Login</h1>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Logar</button>
        </form>
    );
}

export default Home;