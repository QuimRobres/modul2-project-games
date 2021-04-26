const games = require('../API/gameData');
const Game = require('../models/Game.model');
const mongoose = require("mongoose");

mongoose
  .connect('mongodb://localhost/project2-boardgame-app', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    return Game.insertMany(games)
  })
  .then((games) => {
      return mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });