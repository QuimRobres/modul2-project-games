const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const Game = require("../models/Game.model");

router.get('/profile', isLoggedIn, (req, res, next) => {
        res.render('public/profile', { user: req.user, isAuthenticated:req.user });
    });

//SEARCH FOR USERS
router.get("/search", (req, res, next) => {
    const { search } = req.query;
    if (search) {
      User.find({ username: { $regex: `.*(?i)${search}.*` } })
        .then((user) =>
          res.render()
        )
        .catch((error) => next(error));
    } else {
      res.redirect("/games");
    }
  });
  
module.exports = router;