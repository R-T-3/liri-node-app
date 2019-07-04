// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Imports the keys.js file
var keys = require("./key.js");
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');

// // Access Spotify's keys
var spotify = new Spotify(keys.spotify);

// // Access OMDB's keys
// var omdb = new Omdb(keys.omdb);

var command = process.argv[2];
var search = process.argv.slice(3).join("").toString();
console.log(search);
switch(command) {
  case "concert-this":
  console.log("workings");
    concert_this();
    break;
  case "spotify-this-song":
    song = search;
    spotify_this();
    break;
  case "movie-this":
    movie_this();
    break;
  case "do-what-it-says":
    do_this();
    break;
  default:
    console.log("You have entered an incorrect command");
}

// axios retrieving Bands in Town info
var artist;
var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp&date=upcoming";

function concert_this() {
axios.get(queryUrl).then(
  function(response) {
    console.log("Name of Venue: " + response.data[0].venue.name);
    console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
    console.log("Date of Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));  })
  .catch(function(error) {
    console.log(error);
  });
};

// spotify

function spotify_this(){
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
}