const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();

//EDIT PROFILE
router.get("/edit-user", isLoggedIn, (req, res) => {
  res.render("private/edit-profile");
});

module.exports = router;
