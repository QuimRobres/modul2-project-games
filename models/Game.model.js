const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: { type: String, required: true, unique: true },
    year_published: { type: Number },
    min_players: { type: Number },
    max_players: { type: Number },
    min_playtime: { type: Number },
    max_playtime: { type: Number },
    min_age: { type: Number },
    description: { type: String },
    image_url: { type: String },
    price: { type: Number },
    average_user_rating: { type: Number, min: 0, max: 5}
})

const Game = mongoose.model('games', gameSchema);

module.exports = Game;