const { Router } = require("express");
const express = require("express");
const { isLoggedOut, isLoggedIn } = require("../middlewares");
const router = express.Router();
const Game = require("../models/Game.model");
const User = require("../models/User.model");

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("public/profile", {
    user: req.user,
    isAuthenticated: req.user,
    owner: true,
  });
});

//ACCESS
router.get("/profile/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id).then((user) => {
    res.render("public/profile", {
      user,
      isAuthenticated: req.user,
      owner: false,
    });
  });
});

//SEARCH FOR USERS
router.get("/search", (req, res, next) => {
  const { search } = req.query;
  if (search) {
    User.find({ username: { $regex: `.*(?i)${search}.*` } })
      .then((users) => {
        res.render("public/searchUserResult", {
          users,
          search,
          isAuthenticated: req.user,
        });
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
        res.render("public/searchGameList", {
          games,
          search,
          isAuthenticated: req.user,
        });
      })
      .catch((error) => next(error));
  } else {
    res.redirect("/");
  }
});

//SHOW OWNED LIST
router.get("/ownedGames", isLoggedIn, (req, res) => {
  const { owned_games } = req.user;
  let arrGames = owned_games.map((gameId) => {
    return Game.findById(gameId).then((results) => {
      gameId = results;
      return results;
    });
  });
  Promise.all(arrGames).then((results) => {
    res.render("public/ownedGames", { results, isAuthenticated: req.user });
  });
});

//THE OTHER OWN
router.get("/ownedGames/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  User.findById(id).then((foundUser) => {
    let arrGames = foundUser.owned_games.map((gameId) => {
      return Game.findById(gameId).then((results) => {
        gameId = results;
        return results;
      });
    });
    Promise.all(arrGames).then((results) => {
      res.render("public/ownedGames", { results, isAuthenticated: req.user });
    });
  })
    .catch((error) => console.error(error))
});

//SHOW WISHLIST
router.get("/wishlist", isLoggedIn, (req, res) => {
  const { wishlist } = req.user;
  let arrGames = wishlist.map((gameId) => {
    return Game.findById(gameId).then((results) => {
      gameId = results;
      return results;
    });
  });
  Promise.all(arrGames).then((results) => {
    res.render("public/wishlist", { results, isAuthenticated: req.user });
  });
});

//THE OTHER WISHLIST
router.get("/wishlist/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  User.findById(id).then((foundUser) => {
    let arrGames = foundUser.wishlist.map((gameId) => {
      return Game.findById(gameId).then((results) => {
        gameId = results;
        return results;
      });
    });
    Promise.all(arrGames).then((results) => {
      res.render("public/wishlist", { results, isAuthenticated: req.user });
    });
  })
    .catch((error) => console.error(error))
});

//SEARCH FOR GAMES VIEW
router.get("/searchGameList", (req, res, next) => {
  res.render("public/searchGameList", { isAuthenticated: req.user });
});

//SEARCH FOR USERS VIEW
router.get("/searchUserResult", (req, res, next) => {
  res.render("public/searchUserResult", { isAuthenticated: req.user });
});

module.exports = router;