const express = require('express')
const router = express.Router();
const animeController = require('../controller/animeController')


router.get('/anime', animeController.anime )
router.post('/add', animeController.addAnimeList)

module.exports = router;