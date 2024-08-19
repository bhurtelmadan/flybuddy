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

exports.updateFlightById = async (req, res, next) => {
    try {
        const flightId = req.params.id;  // Get the flight ID from the request parameters
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

        const updatedFlight = await Flight.findByIdAndUpdate(
            flightId,
            {
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
            },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedFlight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        res.status(200).json({ message: 'Flight updated successfully', flight: updatedFlight });
    } catch (error) {
        next(error);
    }
};

exports.deleteFlightById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedFlight = await Flight.findByIdAndDelete(id);

        if (!deletedFlight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        res.status(200).json({ message: 'Flight deleted successfully' });
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
