const Message = require('../models/Message');

exports.sendMessage = async (req, res, next) => {
    try {
        const {
            receiverUserId,
            message
        } = req.body;

        const model = new Message({
            receiverUserId,
            message,
            senderUserId: req.user._id
        });

        await model.save();

        res.status(201).json({ message: 'Message created successfully' });
    } catch (error) {
        next(error);
    }
};


exports.getReceivedMessages = async (req, res, next) => {
    try {
        const result = await Message.find({ receiverUserId: req.user._id }).sort({ createdAt: -1 });
        res.status(201).json({ message: 'Received message list successfully', result });
    } catch (error) {
        next(error);
    }
};

exports.getSenderMessages = async (req, res, next) => {
    try {
        const result = await Message.find({ senderUserId: req.user._id }).sort({ createdAt: -1 });
        res.status(201).json({ message: 'Sender message list successfully', result });
    } catch (error) {
        next(error);
    }
};

