const { validPassword } = require('../middleware/validPassword')
const User = require('../models/user.model')

exports.signup = (req, res) => {
    const { username, email } = req.body
    const { salt, hash } = validPassword(req.body.password);

    const newUser = new User({
        username,
        email,
        password: hash,
        SALT: salt
    })

    newUser.save()
        .then((user) => {
            res.status(200).json({ message: 'User created successfully' })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'User was not created, please check your information again' })
        })
}

exports.login = (req, res) => {
    let message = []
    let success = false
    let status = 404
    User.findOne({
        where: {
            'email': req.body.email,
        }
    }).then(function (user) {
        if (user) {
            message.push('User found')
            if (User.prototype.validPassword(req.body.password, user.SALT, user.password)) {
                status = 200;
                success = true;
                message.push('You are authorized');
            }  else {
                message.push('Wrong Pass')
            }
        } else {
            message.push('Check credentials')
        }

        res.json({
            status,
            success,
            message
        })
    })
}
