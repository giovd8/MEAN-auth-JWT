const mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
    message: String,
    // aggiungo l'autore del messaggio importando l'id da User
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});