const router = require('express').Router();
const UserController = require('../Controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/get/users', UserController.getAllusers);

module.exports = router;