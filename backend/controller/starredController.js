const userStarredAnime = require('../models/starred.model')
const Anime = require('../models/anime.model');

// POST /starred_anime
exports.starAnime = async (req, res ) => {
    try {
        // Check if the user is logged in
        if (!req.session.user) {
          return res.status(401).json({ message: 'You must be logged in to star an anime.' });
        }
    
        const { title, rating, action} = req.body;
        const animeTitle = title;
        const userRated = rating;
        const userAction = action;
    
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

        if (existingStarredAnime && userAction === "unstar") {
          // If the anime is already starred, update the starred status to false (don't delete)
          existingStarredAnime.rating = 0;
          existingStarredAnime.starred = false;
          await existingStarredAnime.save();

          return res.status(200).json({ message: 'Anime unstarred successfully.' });
        } else if (existingStarredAnime) {
          // If the anime is already starred, update the rating and starred status
          existingStarredAnime.starred = true;
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