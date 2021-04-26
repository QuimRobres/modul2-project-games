const express = require("express");
const router = require(".");
const Game = require('../models/Game.model')

router.get('/search-game-result', (req, res) => {

    if("number"){
        Game.find({min_age: {$gte: 5}})
        .then(games => {
            res.render("public/search-game-result", {games})
        })
        .catch((error) => console.error(error))
    } else if ("age") {
        Game.find({average_user_rating: {$gte: 3}})
        .then(games => {
            res.render("public/search-game-result", {games})
        })
        .catch((error) => console.error(error))
    }
   
})

module.exports = router;


