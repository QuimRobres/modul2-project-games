const express = require("express");
const router = require(".");
const { db } = require("../models/Game.model");
const Game = require("../models/Game.model");
const User = require('../models/User.model')

router.get("/searchGameResult/kids", (req, res) => {

  Game.find({ min_age: { $lte: 12 } })
    .then((games) => {
        res.render("public/searchGameResult", { games, isAuthenticated: req.user });
    })
    .catch ((error) => console.error(error));
});

router.get("/searchGameResult/rate", (req, res) => {
  Game.find({ average_user_rating: { $gte: 3 } })
    .then((games) => {
      res.render("public/searchGameResult", { games, isAuthenticated: req.user });
    })
    .catch((error) => console.error(error));
});

router.get("/searchGameResult/random", (req, res) => {
  Game.aggregate([{ $sample: { size: 1 } }])
    .then((games) => {
      res.render("public/searchGameResult", { games, isAuthenticated: req.user });
    })
    .catch((error) => console.error(error));
});


router.get("/gameDetail/:id", (req, res) => {
  const { id } = req.params;
  Game.findById(id)
    .then((game) => {

      res.render("public/gameDetail", { game, isAuthenticated: req.user })
    })
    .catch((error) => console.error(error))
})





module.exports = router;
