const { validPassword } = require('../middleware/validPassword')
const User = require('../models/user.model')
const session = require('express-session')
const app = require('../../app')
const MySQLStore = require('express-mysql-session')(session)
require('dotenv').config('../../.env')


const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const sessionStore = new MySQLStore(options);

app.use(session({
    key: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

exports.signup = async (req, res) => {
    const { username, email } = req.body
    const { salt, hash } = validPassword(req.body.password);

    const newUser = new User({
        username,
        email,
        password: hash,
        SALT: salt,
        session_data: JSON.stringify(req.session)

    })
    try {
        await newUser.save();
        res.status(200).json({
            message: "User created successfully"
        })

    }  catch (err) {
        console.error(err)
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
        console.log('+++++++ login req +++++', req.session?.user)
        res.json({
          status,
          success,
          message,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'Error logging in',
        });
      }
}

exports.logout = (req, res) => {
    console.log("+++++++++", req.session.user)
    let user = req.session.user
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: 'Error logging out',
        });
      } else if (user) {
        res.status(200).json({
          message: 'Logged out successfully',
        });
      } else {
        res.status(200).json({
            message: 'No user to logout'
        })
      }
    });
};