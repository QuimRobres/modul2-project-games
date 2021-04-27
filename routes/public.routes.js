const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const User = require('../models/User.model')

router.get('/profile', isLoggedIn, (req, res, next) => {
        res.render('public/profile', { user: req.user, isAuthenticated:req.user });
    });

module.exports = router;