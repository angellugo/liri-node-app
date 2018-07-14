# liri-node-app


## How to run the application
1. `node liri.js my-tweets '<username>'`

   * This will show the username's last 20 tweets and when they were created at in the terminal/bash window. 
   
   * If no username is provided the program will default to nodejs as a username.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in the terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided the program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to the terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' 