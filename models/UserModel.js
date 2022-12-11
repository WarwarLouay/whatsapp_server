const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    country: {
        type: String
    },
    phone: {
        type: String
    },
});

module.exports = mongoose.model('users', userSchema);