const express = require('express');
const bcrypt = require("bcryptjs");
const passport = require('passport');
const router = express.Router();
const saltRound = 10;
const { isLoggedOut, isLoggedIn } = require('../middlewares')
const User = require('../models/User.model');
const Game = require('../models/Game.model')


//GET EDIT PROFILE PAGE
router.get("/edit-profile", isLoggedIn, (req, res, next) => {
  res.render("private/edit-profile");
});
//EDIT PROFILE
router.post("/edit-profile", isLoggedIn, (req, res, next) => {
    const {id} = req.params;
    const {username, email, password} = req.body;
    const users = req.app.locals.users;

    const salt = bcrypt.genSaltSync(saltRound);
    const hashPassword = bcrypt.hashSync(password, salt);

    User.updateOne(id,{$set:{username, email, password: hashPassword}} )
        .then(() => res.redirect('/public/profile'))
        .catch((error) => console.error(error))
})

//ADD GAME TO OWNED LIST
router.post('/gameDetail/own', isLoggedIn, (req, res, next) => {
  User.updateOne({_id: req.user._id}, {$push: {owned_games: req.body.id}})
  .then(() => {
    res.redirect('/public/profile');
  })
  .catch((error) => console.error(error))
})

//REMOVE GAME FROM OWNED LIST
router.post('/gameDetail/ownOut', isLoggedIn, (req, res, next) => {
  User.updateOne({_id: req.user._id}, {$pull: {owned_games: req.body.id}})
  .then(() => {
    res.redirect('/public/profile');
  })
  .catch((error) => console.error(error))
})

//ADD GAME TO WISHLIST
router.post('/gameDetail/wish', isLoggedIn, (req, res, next) => {
  User.updateOne({_id: req.user._id}, {$push: {wishlist: req.body.id}})
  .then(() => {
    res.redirect('/public/profile');
  })
  .catch((error) => console.error(error))
})

//REMOVE GAME FROM WISHLIST
router.post('/gameDetail/wishOut', isLoggedIn, (req, res, next) => {
  User.updateOne({_id: req.user._id}, {$pull: {owned_games: req.body.id}})
  .then(() => {
    res.redirect('/public/profile');
  })
  .catch((error) => console.error(error))
})

//RANDOM GAME FROM OWN LIST
router.get("/searchGameResult/ownrandom", isLoggedIn, (req, res) => {
  const {owned_games} = req.user;
  let gameId = owned_games[Math.floor(Math.random(owned_games) * owned_games.length)]
  Game.findById(gameId)
    .then((game) => {
      res.render("public/gameDetail", { game, isAuthenticated: req.user });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
