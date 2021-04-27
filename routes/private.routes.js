const express = require('express');
const bcrypt = require("bcryptjs");
const passport = require('passport');
const router = express.Router();
const saltRound = 10;
const { isLoggedOut, isLoggedIn } = require('../middlewares')
const User = require('../models/User.model');


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

    User.updateOne(id,{$set:{username, email, password}} )
        .then(() => res.redirect('/public/profile'))
        .catch((error) => console.error(error))
})

//ADD GAME TO OWNED LIST
router.get('/profile', isLoggedIn, (req, res, next) => {
  const {id} = req.params;
  User.findByIdAndUpdate(id, {$push: {owned_games: 2}})
  res.render('./public/profile');
})
module.exports = router;
