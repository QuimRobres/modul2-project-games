const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const User = require('../models/User.model');

//EDIT PROFILE
router.get("/edit-profile", isLoggedIn, (req, res, next) => {
  res.render("private/edit-profile");
});

router.post("/edit-profile", isLoggedIn, (req, res, next) => {
    const {id} = req.params;
    const {username, email, password} = req.body;
    const users = req.app.locals.users;
    User.updateOne(id,{$set:{username, email, password}} )
        .then(() => res.redirect('/public/profile'))
        .catch((error) => console.error(error))
})

module.exports = router;
