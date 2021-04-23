var request = require('request');

request({ url: "https://api.boardgameatlas.com/api/search?order_by=popularity&client_id=a4xZKbLZz1" } , function(err, res, jsonString) {
    var json = JSON.parse(jsonString);
    var gameNameList = json.games.map(e => e.name);
    console.log(gameNameList);
});