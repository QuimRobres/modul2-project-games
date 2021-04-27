const express = require("express");
const router = require(".");
const { db } = require("../models/Game.model");
const Game = require("../models/Game.model");


//SEARCH GAME FOR KIDS
router.get("/searchGameResult/kids", (req, res) => {
  Game.find({ min_age: { $lte: 12 } })
    .then((games) => {
      res.render("public/searchGameResult", { games });
    })
    .catch((error) => console.error(error));
});

//SEARCH GAME BY RATE
router.get("/searchGameResult/rate", (req, res) => {
  Game.find({ average_user_rating: { $gte: 3 } })
    .then((games) => {
      
      res.render("public/searchGameResult", { games });
    })
    .catch((error) => console.error(error));
});


//SEARCH A RANDOM GAME
router.get("/searchGameResult/random", (req, res) => {
    Game.aggregate([{$sample: { size: 1}}])
      .then((games) => {
        console.log(games)
        res.render("public/searchGameResult", { games });
      })
      .catch((error) => console.error(error));
  });


//SHOW GAME DETAILS
router.get("/gameDetail/:id", (req, res) => {
    const {id} = req.params;
    Game.findById(id) 
    .then((game) => {
  
        res.render("public/gameDetail", {game})
    })
    .catch((error) => console.error(error))
})



module.exports = router;
