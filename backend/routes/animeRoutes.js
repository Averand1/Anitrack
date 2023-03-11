const express = require('express')
const router = express.Router();
const animeController = require('../controller/animeController')


router.get('/login/anime', animeController.anime)
router.get('/anime', animeController.anime )

module.exports = router;