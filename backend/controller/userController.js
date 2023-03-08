const User = require('../models/user.model')

exports.signup = (req, res) => {
    const {username, email, password} = req.body

    const newUser = new User({
        username,
        email,
        password
    });

    newUser.save()
    .then(user => {
        res.status(200).json({message: 'User Created Succesfully'})
    })
    .catch(err => {
        err.status(500).json({message: 'User was not created, please check your information again'})
    })

}