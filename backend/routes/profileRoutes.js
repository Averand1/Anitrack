const express = require('express')
const router = express.Router();
const profileController = require('../controller/profileController')


router.get('/profile', profileController.getProfile )
router.post('/profile', profileController.updateProfle )

module.exports = router;