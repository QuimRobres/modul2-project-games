const express = require("express");
const router = require(".");
const Game = require('../models/Game.model')

router.get('/search-game-result', (req, res) => {
    Game.find({min_age: {$gte: 5}})
    .then(games => {
        res.render("public/search-game-result", {games})
    })
    .catch((error) => console.error(error))
})

module.exports = router;


