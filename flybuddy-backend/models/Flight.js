const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    status: { type: String, required: true },
    name: { type: String, required: true },
    airline: { type: String, required: true },
    age: { type: Number, required: true },
    additionalInfo: { type: String },
    age: { type: String },
    arrival: { type: String },
    companionPreference: { type: String },
    date: { type: String },
    departure: { type: String },
    flightNumber: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Flight', flightSchema);