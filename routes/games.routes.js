const express = require("express");
const router = require(".");
const { db } = require("../models/Game.model");
const Game = require("../models/Game.model");

router.get("/searchGameResult/kids", (req, res) => {
  Game.find({ min_age: { $gte: 5 } })
    .then((games) => {
      res.render("public/searchGameResult", { games });
    })
    .catch((error) => console.error(error));
});

router.get("/searchGameResult/rate", (req, res) => {
  Game.find({ average_user_rating: { $gte: 3 } })
    .then((games) => {
      res.render("public/searchGameResult", { games });
    })
    .catch((error) => console.error(error));
});

router.get("/searchGameResult/random", (req, res) => {
    Game.aggregate([{$sample: { size: 1}}])
      .then((games) => {
        console.log(games);
        res.render("public/searchGameResult", { games });
      })
      .catch((error) => console.error(error));
  });




router.get('/searchGameResult/')

module.exports = router;
