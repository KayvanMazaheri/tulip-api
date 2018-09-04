const { User } = require('../models/user')

exports.signup = (req, res, next) => {
    if (req.body.password !== req.body.passwordConf) {
        var errorMessage = 'Passwords do not match.'
        var err = new Error(errorMessage)
        return next(err)
    }

    if (!req.body.email || !req.body.password || !req.body.passwordConf) {
    	var err = new Error('All fields required.')
        return next(err)
    }

    var userData = {
        email: req.body.email,
        password: req.body.password
    }

    User.create(userData)
        .then(user => {
            req.session.userId = user.id
            res.redirect('/profile')
        })
        .catch(err => next(err))
}

exports.signin = (req, res, next) => {
    User.authenticate(req.body.logemail, req.body.logpassword)
        .then(user => {
            req.session.userId = user._id
            res.redirect('/profile')
        })
        .catch(() => {
            const err = new Error('Wrong email or password.')
            err.status = 401
            return next(err)
        })
}

exports.signout = (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/')
            }
        })
    }
}
