const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const { request } = require('express');

app.use(bodyParse.urlencoded({ extended: true }))

app.post('/usuarios',(req,resp) =>{
    console.log(req.body);
    resp.send('<h1>Parabéns novo cliente incluso</h1>');
})

app.post('/usuarios/:id',(req,resp) =>{
    console.log(req.params.id);
    resp.send('<h1>Parabéns usuario alterado</h1>');
})
app.listen(3003)