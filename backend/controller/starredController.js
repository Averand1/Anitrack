const userStarredAnime = require('../models/starred.model')
const Anime = require('../models/anime.model');

// POST /starred_anime
exports.starAnime = async (req, res ) => {
    try {
        // Check if the user is logged in
        if (!req.session.user) {
          return res.status(401).json({ message: 'You must be logged in to star an anime.' });
        }
    
        const { title, rating } = req.body;
        const animeTitle = title;
        const userRated = rating;
    
        // Find the anime record based on the title
        const anime = await Anime.findOne({
          where: {
            title: animeTitle,
          },
        });
    
        // Check if the anime exists
        if (!anime) {
          return res.status(404).json({ message: 'Anime not found.' });
        }
    
        // Find the user's existing starred anime record for this anime, if any
        const existingStarredAnime = await userStarredAnime.findOne({
          where: {
            user_id: req.session.user.id,
            anime_id: anime.id,
          },
        });
    
        if (existingStarredAnime) {
          // If the anime is already starred, update the rating and starred status
          if (existingStarredAnime.rating === userRated) {
            // If the rating is the same, return success message without updating
            return res.status(200).json({ message: 'Anime already starred with same rating.' });
          }
    
          // Update the existing record
          existingStarredAnime.rating = userRated;
          await existingStarredAnime.save();
    
          return res.status(200).json({ message: 'Anime rating updated successfully.' });
        }
    
        // Create a new starred anime record for the user and the anime
        await userStarredAnime.create({
          user_id: req.session.user.id,
          anime_id: anime.id,
          title: animeTitle,
          rating: userRated,
          starred: true,
        });
    
        res.status(201).json({ message: 'Anime starred successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred while starring anime.' });
      }
};
    

// POST /unstarred_anime
exports.unstarAnime = async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.session.user) {
          return res.status(401).json({ message: 'You must be logged in to unstar an anime.' });
        }
    
        const { title } = req.body;
        const animeTitle = title;
    
        // Find the anime record based on the title
        const anime = await Anime.findOne({
          where: {
            title: animeTitle,
          },
        });
    
        // Check if the anime exists
        if (!anime) {
          return res.status(404).json({ message: 'Anime not found.' });
        }
    
        // Find the starred anime record for the user and anime
        const unstarredAnime = await userStarredAnime.findOne({
          where: {
            user_id: req.session.user.id,
            anime_id: anime.id,
          },
        });
    
        if (unstarredAnime) {
          // If the starred anime record exists, update the starred status to false (don't delete)
          unstarredAnime.starred = false;
          await unstarredAnime.save();
        }
    
        res.status(200).json({ message: 'Anime unstarred successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred while unstarring anime.' });
      }

};
