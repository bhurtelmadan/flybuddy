const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: { type: String },
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Message', messageSchema);