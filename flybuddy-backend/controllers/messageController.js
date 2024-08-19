const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res, next) => {
    try {
        const {
            receiverUserId,
            message
        } = req.body;
        const findReceiverUser = await User.findById(receiverUserId);

        const model = new Message({
            receiverUserId,
            to: findReceiverUser.name,
            message,
            senderUserId: req.user._id,
            from: req.user.name,
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
exports.deleteMessageById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await Message.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        next(error);
    }
};

