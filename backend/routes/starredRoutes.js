const express = require('express')
const router = express.Router();
const starredController = require('../controller/starredController')


router.post('/star', starredController.starAnime)

module.exports = router;