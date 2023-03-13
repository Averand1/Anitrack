const { validPassword } = require('../middleware/validPassword')
const moment = require('moment')
const User = require('../models/user.model')
require('dotenv').config('../../.env')

exports.signup = async (req, res) => {
    const { username, email, birthdate } = req.body
    const { salt, hash } = validPassword(req.body.password);
    const formattedBirthDate = moment(birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD')

    const newUser = new User({
        username,
        email,
        password: hash,
        birthdate: formattedBirthDate,
        SALT: salt,
        session_data: JSON.stringify(req.session)

    })
    try {
        await newUser.save();
        res.status(200).json({
            message: "User created successfully"
        })

    }  catch (err) {
      console.log(err)
        res.status(404).json({
            message: 'User was not created, please check your information'
        })

    } 
}

exports.login = async (req, res) => {
    let message = []
    let success = false
    let status = 404
    try {
        const user = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (user) {
          message.push('User found');
          if (validPassword(req.body.password, user.SALT, user.password)) {

            const sessionData = JSON.parse(user.session_data);
            sessionData.isLoggedIn = true;
            user.session_data = JSON.stringify(sessionData);
            req.session.user = user;

            await user.save();
            status = 200;
            success = true;
            message.push('You are authorized');
          } else {
            message.push('Wrong Pass');
          }
        } else {
          message.push('Check credentials');
        }
        res.json({
          status,
          success,
          message,
        });
      } catch (err) {
        res.status(500).json({
          message: 'Error logging in',
        });
      }
}

exports.logout = (req, res) => {
    if (req.session?.user) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({
            message: 'Error logging out',
          });
        } else {
          res.status(200).json({
            message: 'Logged out successfully',
          });
        }
      });
    } else {
      res.status(500).json({
        message: 'No user session found',
      });
    }

};
