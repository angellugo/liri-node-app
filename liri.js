// Read and set environment variables
require("dotenv").config();

console.log("Loading keys.js...");
var keys = require("./keys");


process.argv[2] === "my-tweets" && getTweets(process.argv[3]);




function getTweets(screenName) {
  console.log("\nLoading tweets...");

  var Twitter = require('twitter'); 
  var twitter = new Twitter(keys.twitter);
  var params = { screen_name: screenName || 'nodejs', count: 2 };
  twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      console.log(error);
    }
    else {
      tweets.forEach(tweet => {
        console.log("\n" + tweet.created_at + " - " + tweet.text);
      });
    }
  });
}
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });

// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });