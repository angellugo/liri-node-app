const debug = false;

// Read and set environment variables
require ('dotenv').config ();

debug && console.log ('Loading keys.js...');
const keys = require ('./keys');

process.argv[2] === 'my-tweets' && getTweets (process.argv[3]);
process.argv[2] === 'spotify-this-song' && getSong (process.argv[3]);

function getTweets (screenName) {
  console.log ('\nLoading tweets...');

  const Twitter = require ('twitter');
  const twitter = new Twitter (keys.twitter);
  const params = {screen_name: screenName || 'nodejs', count: 20};
  twitter.get ('statuses/user_timeline', params, function (
    error,
    tweets,
    response
  ) {
    if (error) {
      console.log (error);
    } else {
      tweets.forEach (tweet => {
        console.log ('\n' + tweet.created_at + ' - ' + tweet.text);
      });
    }
  });
}

function getSong (song) {
  var songName = song || 'The Sign artist:Ace of Base';
  debug && console.log ('songName', songName);
  
  console.log ('\nLoading Spotify data...');
  const Spotify = require ('node-spotify-api');
  const spotify = new Spotify (keys.spotify);
  const params = {type: 'track', query: "'" + songName + "'", limit: 1};
  
  spotify.search (params, function (err, data) {
    if (err) {
      return console.log ('Error occurred: ' + err);
    }

    debug && console.log(data.tracks.items[0]);

    console.log ('Artist:', data.tracks.items[0].album.artists[0].name);
    console.log ('Song Name:', data.tracks.items[0].name);
    console.log ('Link to song:', data.tracks.items[0].album.external_urls.spotify);
    console.log ('Album Name:', data.tracks.items[0].album.name);
  });
}
