// .env file
const dotenv = require('dotenv');
dotenv.config();
// express
const express = require('express');
// importo body parser per passare la richiesta post da url
const bodyParser = require ('body-parser');
// middleware
const cors = require('cors');
// mongoDB
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
// importo schema DB
const User = require('./models/User');
// importo il modulo auth per login e register
const auth = require('./auth');
// iporto lo schema per i messaggi
const PostMsg = require('./models/Post');
const jwt = require('jwt-simple');
const app = express();

// indica a mongoose che voglio utilizzare le es6 promise
mongoose.Promise = Promise;

// faccio utilizzare all'app il middleware, necessario per comunicazione backend frontend
app.use(cors());
// passo al body un json e lo visualizzo in console
app.use(bodyParser.json());

 // vedo i messaggi
app.get('/posts/:id', async (req,res)=>{
    // carico i messaggi dal DB
    const author = req.params.id;

    const posts = await PostMsg.find({author});
    res.send(posts);
});
// mando un messaggio
app.post('/post', auth.checkAuthenticated, (req, res) => {
    const postData = req.body;
    postData.author = req.userId;

    //con new post non va dc
    const post = new PostMsg(postData);
    post.save((err, result) => {
        if (err) {
            console.error('Problema nel salvataggio del post');
            return res.status(500).send({ message: 'Problema nel salvataggio del post'})
        }
        else
            console.log("Post salvato correttamente");
        // tolto res perche visto come errore sulla console
        //res.sendStatus(200);
    });
});

app.get('/users', async (req,res)=>{
    try {
        // vedo la lista degli utenti e rimuovo il campo password e version
        let user = await User.find({}, '-password -__v')
        res.send(user);
    }
    catch {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/profile/:id', async (req, res) => {
    try {
        // con req.params.id prendo l'id passato dalla richiesta
        let user = await User.findById(req.params.id, '-password -__v')
        res.send(user);
    }
    catch {
        console.error(error);
        res.sendStatus(500);
    }
});

//connect to database
mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log("Errorre nella connessione al DB");
    }
    else {
        console.log("Connessione stabilita al DB");
    }
});

// aggiungo gli endpoint /register e /login da auth
app.use('/auth', auth.router);

app.listen(process.env.PORT || 3000, () => {
    // prima sul file env c'era: PORT=3000, ho dovuto toglierlo perche questa info adesso è dentro il
    //file environment.ts e creava uin conflitto, adesso segna port undefined ma funzia
    console.log(`Server avviato nella porta ${process.env.PORT}`);
});