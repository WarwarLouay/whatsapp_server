const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    sourceId: {
        type: String
    },
    targetId: {
        type: String
    },
    message: {
        type: String
    },
    time: {
        type: String
    }
});

module.exports = mongoose.model('messages', userSchema);