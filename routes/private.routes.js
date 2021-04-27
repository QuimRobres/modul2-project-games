const express = require('express');
const bcrypt = require("bcryptjs");
const passport = require('passport');
const router = express.Router();
const saltRound = 10;
const { isLoggedOut, isLoggedIn } = require('../middlewares')
const User = require('../models/User.model');
const Game = require('../models/Game.model')


//EDIT PROFILE
router.get("/edit-profile", isLoggedIn, (req, res, next) => {
  res.render("private/edit-profile");
});

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
router.post('/profile/:id', isLoggedIn, (req, res, next) => {
  const {id} = req.params;
  User.updateOne({_id: req.user._id}, {$push: {owned_games: id}})
  res.redirect('/public/profile');
})

module.exports = router;
