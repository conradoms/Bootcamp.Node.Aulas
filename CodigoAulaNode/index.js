const express = require('express');

const server = express();

server.use(express.json());

const users = ['Conrado', 'Simone', 'Miguel'];

server.use((req, res, next) =>{
    console.log(`Metodo: ${req.method}`);
    console.log(`URL: ${req.url}`);
    next();
});

server.use((req, res, next) =>{
    console.time('Request');
    
    next();

    console.timeEnd('Request');
});

server.get('/users', (req, res) => {
    res.json(users);
})

server.get('/users/:index', (req, res) => {
    const { index } = req.params;
    res.json(users[index]);
});

server.post('/users', (req, res) => {
    const { nome } = req.body;
    users.push(nome);
    return res.json(users);
});

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    users[id] = nome;

    return res.json(users);
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users.splice(id, 1);
    return res.json(users);
});

server.listen(3000);