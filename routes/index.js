const express = require("express");
const router = express.Router();
const User = require('../models/User.model')

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

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const isAuthenticated = await logged(req);
    res.render("index", { isAuthenticated });
  } catch (error) {
    console.log(error);
  };
});

module.exports = router;
