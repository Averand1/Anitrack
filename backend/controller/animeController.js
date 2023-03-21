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

      res.status(500).json({ error: 'Server error' });
    }
}

exports.addAnimeList = async (req, res) => {
  if (req.session.user && req.session.user.role === 10) {
    const { animeList } = req.body;
    try {
      const newAnimeList = await Anime.bulkCreate(animeList);
      return res.status(200).json({ message: 'Anime list added successfully.', animeList: newAnimeList });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};