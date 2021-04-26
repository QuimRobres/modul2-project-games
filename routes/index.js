const express = require("express");
const router = express.Router();

const isAuthenticated = async (req) => {
  try {
    if (req.session.currentUser) {
      const user = await User.findById(req.session.currentUser._id);
      return user;
    } else {
      return false;
    }
  } catch (error) { }
};

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const session = await isAuthenticated(req);
    res.render("index"), { session };
  } catch (error) {
    console.log(error);
  };
});

module.exports = router;
