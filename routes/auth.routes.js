const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport')
const router = express.Router();
const saltRound = 10;
const { isLoggedOut, isLoggedIn } = require('../middlewares')
const User = require('../models/User.model');

//SIGNUP
router.get('/signup', (req, res, next) => {
    res.render('public/signup');
})

router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password ) {
        res.render('public/signup', { errorMessage: "Username and password are required"})
    }

    User.findOne({username}, {email})
    .then(user => {
        if (user) {
            res.render('public/signup', {errorMessage: "User already exists"})
        }

        if (user) {
            res.render('public/signup', {errorMessage: "User already exists"})
        }

        const salt = bcrypt.genSaltSync(saltRound);
        const hashPassword = bcrypt.hashSync(password, salt);

        User.create({ username, email, password: hashPassword })
        .then((newUser) => {
            console.log(newUser)
            req.login((newUser), (error) => {
                if(error){
                    next(error)
                }
                res.redirect('/')
            })
        })
        .catch((error) => {
            console.log(error);
            return res.render('public/signup', { errorMessage: "Server error. Try again"})
        })

    })
})


module.exports = router;