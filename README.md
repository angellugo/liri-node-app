# LIRI Bot

## Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is be a command line node app that takes in parameters and gives you back data.


## Prerequisites:
1. Download the code to your machine.

2. Make a .env file with the following:

    ```
    # Spotify API keys

    SPOTIFY_ID=xxxxxx
    SPOTIFY_SECRET=xxxxxx

    # Twitter API keys

    TWITTER_CONSUMER_KEY=xxxxxx
    TWITTER_CONSUMER_SECRET=xxxxxx

    TWITTER_ACCESS_TOKEN_KEY=xxxxxx-xxxxxx
    TWITTER_ACCESS_TOKEN_SECRET=xxxxxx

    # OMDb API keys

    OMDb_API_KEY=xxxxxx
    ```

3. Replace the `xxxxxx` with your keys.

4. Install the necessary packages by running `npm install`

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
       * IMDb Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' 

   4. `node liri.js do-what-it-says`
   
   * When you command LIRI to do-what-it-says, LIRI will take the text inside of random.txt and then use it to call  LIRI's commands.
     
     * The file contains a list of commands and parameters for LIRI to do.
