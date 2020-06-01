const User = require('./models/User');
// bcript
const bcrypt = require('bcrypt');
// JWT
const jwt = require('jwt-simple');
const express = require('express');
const router = express.Router();

router.post('/register',(req, res) => {
    const userData = req.body;
    const user = new User(userData);
    user.save((err, newUser) => {
        if (err)
            res.status(401).send({ message:"Problema nel salvataggio utente" });
        else {
            console.log("Registrazione avvenuta con successo")
        }
        // il send status rompe il cazzo sulla console
        // res.sendStatus(200);

        // copiato da login per far si che una volta registrato ti logghi in automatico
        createSendToken(res, newUser);
    });
});

router.post('/login', async (req, res) => {
    const loginData = req.body;
    // cerco la mail all'interno del DB
    const user = await User.findOne({ email: loginData.email });

    if (!user)
        return res.status(401).send({ message: 'Username o password non corretti' });

    bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
        if (!isMatch) {
            return res.status(401).send({ message: 'Username o password non corretti' });
        }
        else {
            console.log("Login effettuato correttamente")
        }
        createSendToken(res, user);
    })
});

function createSendToken(res, user) {
    // salvo nel payload l'user id (sub = subject)
    const payload = { sub: user._id };
    // passo payload e la chiave
    const token = jwt.encode(payload, '123');
    // passo il token al frontend
    res.status(200).send({ token: token });
}

const auth = {
    router,
    // middleware per il login
    checkAuthenticated: (req, res, next) => {
        // se nell'header della mia richioesta di autenticazione non c'è il token ritorno stato 401
        if(!req.header('authorization'))
            return res.status(401).send({ message: 'Unauthorized. Missing Auth Header' });
            // serve per far saltare la scritta token piu lo spazio e prende direttamente
            //il valore del token su authInterceptor.service
            const token = req.header('authorization').split(' ')[1];
            //decodifico il token con la chiave
            const payload = jwt.decode(token, '123')
            if (!payload)
                return res.status(401).send({ message: 'Unauthorized. Missing Auth Header' });
            // definito su auth
            req.userId = payload.sub;
            next();
    }
}

module.exports = auth;