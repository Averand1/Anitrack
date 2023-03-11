const express = require('express');
const router = express.Router();
const Anime = require('../models/anime.model');

exports.anime = async (req, res) => {
    try {
      if (req.session?.user) {
        const animeList = await Anime.findAll({limit: 50});
        res.json(animeList);
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    } catch (error) {
      console.error(error);
      res.status(403).json({ error: 'Server error' });
    }
}