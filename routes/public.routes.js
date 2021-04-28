const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Game = require("../models/Game.model");
const User = require("../models/User.model");

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("public/profile", { user: req.user, isAuthenticated: req.user });
});

//SEARCH FOR USERS
router.get("/search", (req, res, next) => {
  const { search } = req.query;
  let mappedUsers = [];
  if (search) {
    const { search } = req.query;
    User.find({ username: { $regex: `.*(?i)${search}.*` } })
      .then((users) => {
        console.log(users)
        mappedUsers = users;
        res.render("public/searchUserResult", { users: mappedUsers, search , isAuthenticated: req.user});
      })
      .catch((error) => next(error));
  } else {
    res.redirect("/");
  }
});

//SEARCH FOR GAMES
router.get("/searchGame", (req, res, next) => {
  const { search } = req.query;
  if (search) {
    Game.find({ name: { $regex: `.*(?i)${search}.*` } })
      .then((games) => {
        res.render("public/searchGameResult", { games , search, isAuthenticated: req.user });
      })
      .catch((error) => next(error));
  } else {
    res.redirect("/");
  }
});

router.get("/searchUserResult", (req, res, next) => {
  res.render("public/searchUserResult", { isAuthenticated: req.user });
});

module.exports = router;
