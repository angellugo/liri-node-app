const debug = false;

require ('dotenv').config (); // Read and set environment variables

console.log ('Loading keys.js...');
const keys = require ('./keys');

run (process.argv[2], process.argv[3]);

function run (option1, option2) {
  option1 === 'my-tweets' && getTweets (option2);
  option1 === 'spotify-this-song' && getSong (option2);
  option1 === 'movie-this' && getMovie (option2);
  option1 === 'do-what-it-says' && doWhatItsSays ();
}

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

    debug && console.log (data.tracks.items[0]);

    console.log ('Artist:', data.tracks.items[0].album.artists[0].name);
    console.log ('Song Name:', data.tracks.items[0].name);
    console.log (
      'Link to song:',
      data.tracks.items[0].album.external_urls.spotify
    );
    console.log ('Album Name:', data.tracks.items[0].album.name);
  });
}

function getMovie (movie) {
  console.log ('\nLoading OMDb data...');
  const request = require ('request');
  var movieTitle = movie || 'Mr Nobody';
  request (
    'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&apikey=trilogy',
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log (body);
        console.log ("The movie's title is: " + JSON.parse (body).Title);
        console.log ('Year the movie was released: ' + JSON.parse (body).Year);
        console.log (
          "The movie's IMDb rating is: " + JSON.parse (body).imdbRating
        );
        // console.log ("The movie's Rotten Tomatoes rating is: " + JSON.parse (body).tomatoRating);
        console.log (
          "The movie's Rotten Tomatoes rating is: " +
            JSON.parse (body).Ratings[1].Value
        );
        console.log (
          'Country where the movie was produced: ' + JSON.parse (body).Country
        );
        console.log ('Language of the movie: ' + JSON.parse (body).Language);
        console.log ('Plot of the movie: ' + JSON.parse (body).Plot);
        console.log ('Actors in the movie: ' + JSON.parse (body).Actors);
      } else {
        console.log (error);
      }
    }
  );
}

function doWhatItsSays () {
  var fs = require ('fs');
  var readline = require ('readline');

  var rd = readline.createInterface ({
    input: fs.createReadStream ('./random.txt'),
    output: process.stdout,
    console: true,
  });

  rd.on ('line', function (line) {
    var lineItems = line.split(",");
    run(lineItems[0], lineItems[1]);
  });
}
