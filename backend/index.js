const express = require('express');
const app = express();

const post = [
    { message: 'Ciao Jolly' },
    { message: 'Ciao Joker' }
];

app.get('/posts', (req,res)=>{
    res.send(post);
});

app.listen(3000, ()=>{
    console.log('Server avviato correttamente nella porta 3000');
});