const games = require('../API/gameData');
const Game = require('../models/Game.model');
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    games.forEach(game => {
      game.average_user_rating = game.average_user_rating.toFixed(2);
    })
    return Game.insertMany(games)
  })
  .then((games) => {
      return mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });