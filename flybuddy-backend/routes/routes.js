const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const flightController = require('../controllers/flightController');
const messageController = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/users/signup', userController.signup);
router.post('/users/login', userController.login);

router.post('/flights', protect, flightController.createFlight);
router.put('/flights/:id', protect, flightController.updateFlightById);
router.delete('/flights/:id', protect, flightController.deleteFlightById);
router.get('/flights',protect, flightController.getFlight);
router.get('/flights/others',protect, flightController.getOtherUserFlight);

router.post('/message/send', protect, messageController.sendMessage);
router.get('/message/received', protect, messageController.getReceivedMessages);
router.get('/message/sent', protect, messageController.getSenderMessages);
router.delete('/message/:id', protect, messageController.deleteMessageById);

module.exports = router;