const express = require('express');

const server = express();

server.use(express.json());

const users = ['Conrado', 'Simone', 'Miguel'];

function checkUserInArray(req, res, next){
    const user = users[req.params.id];
    
    if(!user){
        return res.status(400).json({erro: 'This id was not found on users array.'});
    }

    req.user = user;

    next();
}

function checkUserExists(req, res, next){
    if(!req.body.nome){
        return res.status(400).json({error: 'User name is required' });
    }

    next();
}

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

server.get('/users/:id', checkUserInArray, (req, res) => {
    res.json(req.user);
});

server.post('/users', checkUserExists, (req, res) => {
    const { nome } = req.body;
    users.push(nome);
    return res.json(users);
});

server.put('/users/:id', checkUserExists, checkUserInArray, (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    users[id] = nome;

    return res.json(users);
});

server.delete('/users/:id', checkUserInArray, (req, res) => {
    const { id } = req.params;
    users.splice(id, 1);
    return res.json(users);
});

server.listen(3000);