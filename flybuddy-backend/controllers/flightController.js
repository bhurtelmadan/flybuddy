const Flight = require('../models/Flight');

exports.createFlight = async (req, res, next) => {
    try {
        const {
            additionalInfo,
            age,
            airline,
            arrival,
            companionPreference,
            date,
            departure,
            flightNumber,
            name,
            status
        } = req.body;

        const newFlight = new Flight({
            additionalInfo,
            age,
            airline,
            arrival,
            companionPreference,
            date,
            departure,
            flightNumber,
            name,
            status,
            userId: req.user._id
        });

        await newFlight.save();

        res.status(201).json({ message: 'Flight created successfully' });
    } catch (error) {
        next(error);
    }
};


exports.getFlight = async (req, res, next) => {
    try {
        ////const result = await Flight.find({ userId: req.user._id }).sort({ createdAt: -1 });
        const result = await Flight.find().sort({ createdAt: -1 });
        res.status(201).json({ message: 'Flight list successfully', result });
    } catch (error) {
        next(error);
    }
};

exports.getOtherUserFlight = async (req, res, next) => {
    try {
        const result = await Flight.find({ userId: { $ne: req.user._id } }).sort({ createdAt: -1 });
        res.status(201).json({ message: 'Flight list successfully', result });
    } catch (error) {
        next(error);
    }
};
