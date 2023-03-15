const express = require('express')
const router = express.Router();
const starredController = require('../controller/starredController')


router.post('/star', starredController.starAnime)
router.post('/unstar', starredController.unstarAnime)


module.exports = router;