const moment = require('moment')
const User = require('../models/user.model');
const Profile = require('../models/profile.model')

// GET profile API to get user data
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.session.user.id } });
        if (user) {
          let profile = await Profile.findOne({ where: { user_id: user.id } });
          if (!profile) {
            // create a new profile if it does not exist
            profile = await Profile.create({ user_id: user.id, email: user.email, birthdate: user.birthdate});
          }
          const formattedBirthdate = moment(profile.birthdate).format('DD/MM/YYYY');
          res.status(200).json({ data: { ...profile.toJSON(), birthdate: formattedBirthdate } });
        } else {
          res.status(403).json({ message: 'User not found' });
        }
      } catch (err) {
        res.status(500).json({ message: 'Be sure to log in' });
      }
};

// POST profile API to update user profile
exports.updateProfle = async (req, res) => {
    try {
        const {email, first_name, last_name } = req.body;
        const user = await User.findOne({ where: { id: req.session.user.id } });
        if (user) {
          // Get or create profile for the user
          let profile = await Profile.findOne({ where: { user_id: user.id } });
          if (!profile) {
            profile = await Profile.create({ user_id: user.id });
          }
    
          // Update first and last name
          if (first_name, last_name, email) {
            profile.first_name = first_name ?? null;
            profile.last_name = last_name ?? null;
            profile.email = email ?? user.email;
          }
          await profile.save();
    
          res.status(200).json({ message: 'User profile updated successfully' });
        } else {
          res.status(403).json({ message: 'User not found' });
        }
      } catch (err) {
        res.status(500).json({ message: 'Make sure to be logged in to Update Profile' });
    }
};
