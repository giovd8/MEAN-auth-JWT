const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// schema dati del DB
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    description: String
});

// uso una fuction normale per avere una reference dell'user
userSchema.pre('save', function(next) {
    const user = this;
    // se non serve decriptare la password
    if(!user.isModified('password')){
        return next();
    }
    // decripto password, non so perche il 0 ma mettendo null non va
    bcrypt.hash(user.password, 0, function(err, hash) {
        if(err) {
            return next(err);
        }
        user.password=hash;
        next();
    })
})

// creazione oggetto per il DB
module.exports = mongoose.model('User', userSchema);