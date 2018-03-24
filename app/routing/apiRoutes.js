var bodyParser = require("body-parser");
var friendData = require("../data/friends")
var fs = require("fs");
var path = require("path");

console.log(friendData);

module.exports = function(app){
  
    app.get('/api/friends', function(req, res){
      res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
      var newFriend = req.body

      //Set the best Match to the highest it can be
      var bestMatch = 50;
      var bestFriend;   
    
      //For each of the friends
      friendData.forEach(function(friend) {
        var matchArr = [];
  
      //Create a new array representing the distance
        for (var i = 0; i < 10; i++) {
          newFriend.scores[i] = parseInt(newFriend.scores[i]);
          matchArr.push(Math.abs(newFriend.scores[i] - friend.scores[i]));
        }
        //Add all the items in new array together
        var reducer = (a, b) => a + b;
        var currentMatch = matchArr.reduce(reducer);
    
        //if the current match is smaller than the best match this friend is more like the new friend
        if (currentMatch <= bestMatch) {
          bestMatch = currentMatch;
          bestFriend = friend;
        }
      });
      //respond to the POST with the best friend
      res.json(bestFriend);
  
      //after all that add the new friend into the dataset
      friendData.push(newFriend);

      // //write the dataset to the friends file
      // var json = JSON.stringify(friendData);
      
      // fs.writeFile(path.join(__dirname, "../data/friends.js"), json, "utf8", function(err) {

      //   if (err) {
      //     return console.log(err);
      //   }

      // });
    });
  };