const debug = false;

console.log ('\nLoading keys.js...');
require ('dotenv').config (); // Read and set environment variables
const keys = require ('./keys');
const Twitter = require ('twitter');
const Spotify = require ('node-spotify-api');
const request = require ('request');
const fs = require ('fs');

run (process.argv[2], process.argv[3]);

function run (command, instructions) {
  log (command, instructions);
  switch (command) {
    case 'my-tweets':
      getTweets (instructions);
      break;
    case 'spotify-this-song':
      getSong (instructions);
      break;
    case 'movie-this':
      getMovie (instructions);
      break;
    case 'do-what-it-says':
      doWhatItsSays ();
      break;
    default:
      console.log ('Invalid input. Please read README for instructions.');
  }// end switch
}// end function run

function log (command, instructions) {
  fs.appendFile ('log.txt', command + ',' + instructions + '\n', function (error) {
    if (error) {
      return console.log (error);
    }
  });// end fs.appendFile
}// end function log

function getTweets (screenName) {
  console.log ('\nLoading tweets...');
  const twitter = new Twitter (keys.twitter);
  const params = {screen_name: screenName || 'nodejs', count: 20};
  twitter.get ('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      console.log (error);
    } else {
      tweets.forEach (tweet => {
        console.log ('\n' + tweet.created_at + ' - ' + tweet.text);
      });// end tweets.forEach (tweet => {
    }// end else
  });// end twitter.get 
}// end function getTweets

function getSong (song) {
  var songName = song || 'The Sign artist:Ace of Base';
  debug && console.log ('songName', songName);

  console.log ('\nLoading Spotify data...');
  const spotify = new Spotify (keys.spotify);
  const params = {type: 'track', query: "'" + songName + "'", limit: 1};
  spotify.search (params, function (error, data) {
    if (error) {
      return console.log ('Error occurred: ' + error);
    }

    debug && console.log (data.tracks.items[0]);

    console.log ('Artist:', data.tracks.items[0].album.artists[0].name);
    console.log ('Song Name:', data.tracks.items[0].name);
    console.log ('Link to song:', data.tracks.items[0].album.external_urls.spotify);
    console.log ('Album Name:', data.tracks.items[0].album.name);
  });
}

function getMovie (movie) {
  console.log ('\nLoading OMDb data...');
  var movieTitle = movie || 'Mr Nobody';
  request ('http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        debug && console.log (body);
        console.log ("The movie's title is: " + JSON.parse (body).Title);
        console.log ('Year the movie was released: ' + JSON.parse (body).Year);
        console.log ("The movie's IMDb rating is: " + JSON.parse (body).imdbRating);
        console.log ("The movie's Rotten Tomatoes rating is: " + JSON.parse (body).Ratings[1].Value);
        console.log ('Country where the movie was produced: ' + JSON.parse (body).Country);
        console.log ('Language of the movie: ' + JSON.parse (body).Language);
        console.log ('Plot of the movie: ' + JSON.parse (body).Plot);
        console.log ('Actors in the movie: ' + JSON.parse (body).Actors);
      } else {
        console.log (error);
      }//end else
    });// end request
}//end function getMovie

function doWhatItsSays () {
  console.log ('\nLoading file data...');

  fs.readFile ('random.txt', 'utf8', function (error, data) {
    if (error) {
      return console.log (error);
    }
    const lines = data.split ('\r\n');
    debug && console.log ('lines', lines);
    lines.forEach (line => {
      const lineItems = line.split (',');
      debug && console.log (lineItems[0], lineItems[1]);
      run (lineItems[0], lineItems[1]);
    }); // lines.forEach(line => {
  }); // end fs.readFile("random.txt", "utf8", function(error, data) {
}//end function doWhatItSays