const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('public/profile', { user: req.user });
})

module.exports = router;