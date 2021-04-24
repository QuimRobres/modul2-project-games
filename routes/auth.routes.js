const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
const saltRound = 10;
const { isLoggedOut, isLoggedIn} = require("../middlewares");
const User = require("../models/User.model");

//SIGNUP
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render("auth/signup", {
      errorMessage: "Username and password are required",
    });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      res.render("auth/signup", { errorMessage: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(saltRound);
    const hashPassword = bcrypt.hashSync(password, salt);

    User.create({ username, email, password: hashPassword })
      .then((newUser) => {
        console.log(newUser);
        req.login((newUser), (error) => {
          if (error) {
            next(error);
          }
          res.redirect("/");
        });
      })
      .catch((error) => {
        console.log(error);
        return res.render("auth/signup", {
          errorMessage: "Server error. Try again",
        });
      });
  });
});

//LOGIN
router.get('/login', (req, res) => {
  res.render('auth/login');
})

router.post('/login', passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/auth/login",
  passReqToCallback: true
}));

//LOGOUT
router.get("/logout", (req, res) => {
  console.log("loggedout");

  req.logout();
  res.redirect("/auth/login");
});

const ensureLogin = require('connect-ensure-login');

module.exports = router;
