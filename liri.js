// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Imports the keys.js file
var keys = require("./key.js");
var axios = require('axios');
var moment = require('moment');

// // Access Spotify's keys
// var spotify = new Spotify(keys.spotify);

// // Access Bands in Town's keys
// var bandsInTown = new BandsInTown(keys.bandsInTown);

// // Access OMDB's keys
// var omdb = new Omdb(keys.omdb);

var nodeArgs = process.argv;
if (nodeArgs[2] === "concert-this"){

var artist = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length){
        artist = artist + "+" + nodeArgs[i];
    } else {
        artist += nodeArgs[i];
    }
}

// Then run a request with axios to the Bands in Town API with the artist specified
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";

axios.get(queryUrl).then(
  function(response) {
    console.log("Name of Venue: " + response.data[0].venue.name);
    console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
    console.log("Date of Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
};