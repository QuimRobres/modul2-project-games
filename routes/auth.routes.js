const express = require('express');
const bcrypt = require("bcryptjs");
const passport = require('passport');
const router = express.Router();
const saltRound = 10;
const { isLoggedOut, isLoggedIn } = require('../middlewares')
const User = require('../models/User.model');

const logged = async (req) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);
      return user;
    } else {
      return false;
    }
  } catch (error) { }
};

//RENDERS SIGNUP VIEW
router.get('/signup', async (req, res, next) => {
  try {
    const session = await logged(req);
    res.render('auth/signup');
  } catch(error) {
    console.log(error);
  }
    
})
//CREATES USER
router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password) {
    res.render('auth/signup', { errorMessage: "Username and password are required"})
  }

  User.findOne({username})
  .then(user => {
    if (user) {
      res.render('auth/signup', { errorMessage: "User already exists"})
    }

    const salt = bcrypt.genSaltSync(saltRound);
    const hashPassword = bcrypt.hashSync(password, salt);

    User.create({ username, email, password: hashPassword})
    .then((newUser) => {
      req.login((newUser), (error) => {
        if(error){
          next(error)
        }
        res.redirect("/")
      })
    })
    .catch((error) => {
      console.log(error);
      return res.render('auth/signup', { errorMessage: "Server error. Try again."})
    })
  })
})

//RENDERS LOGIN PAGE
router.get('/login', isLoggedOut, (req, res) => {
  res.render('auth/login', {errorMessage: req.flash("error")[0]});
})

//LOGS THE USER
router.post('/login', passport.authenticate("local", {
  successRedirect: "/public/profile",
  failureRedirect: "/auth/login",
  passReqToCallback: true,
  failureFlash: true
}));

//LOGOUT
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})


const ensureLogin = require('connect-ensure-login');

module.exports = router;
