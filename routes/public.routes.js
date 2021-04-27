const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const Game = require("../models/Game.model");

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('public/profile', { user: req.user });
})

//SEARCH FOR USERS
router.get("/search", (req, res, next) => {
    const { search } = req.query;
    if (search) {
      Game.find({ name: { $regex: `.*(?i)${search}.*` } })
        .then((games) =>
          res.render("games/game-list", { games, search, sessionUser: req.user })
        )
        .catch((error) => next(error));
    } else {
      res.redirect("/games");
    }
  });
  
module.exports = router;