const router = require('express').Router();
const MessageController = require('../Controllers/MessageController');

router.post('/send/message', MessageController.sendMessage);
router.post('/get/message', MessageController.getMessages);

module.exports = router;