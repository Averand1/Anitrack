const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')


router.post('/signup', userController.signup)
router.post('/login', userController.login);
router.get('/login/logout', userController.logout)
router.get('/logout', userController.logout);

module.exports = router;