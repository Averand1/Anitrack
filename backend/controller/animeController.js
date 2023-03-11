const Anime = require('../models/anime.model');

exports.anime = async (req, res) => {
    try {
      if (req.session?.user) {
        const page = parseInt(req.query.page) || 1; 
        const pageSize = parseInt(req.query.pageSize) || 10; 
        const offset = (page - 1) * pageSize; 
        const animeList = await Anime.findAll({ limit: pageSize, offset: offset })
        res.json(animeList);
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
}