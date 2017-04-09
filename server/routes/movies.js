var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
  name: String,
  director: String,
  genre: String,
  plot: String,
  poster: String,
  rated: String,
  released: String,
  runtime: String,
});

var Movie = mongoose.model("movie", movieSchema, "movies");

router.post("/add", function(req, res)
{
  var movie = new Movie({
    name: req.body.name,
    director: req.body.director,
    genre: req.body.genre,
    plot: req.body.plot,
    poster: req.body.poster,
    rated: req.body.rated,
    released: req.body.released,
    runtime: req.body.runtime,
  });
  movie.save(function(err, savedMovie)
  {
    if(err)
    {
      console.log("Error: " + err);
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

router.get("/pull", function(req, res)
{
  Movie.find({}, function(err, allMovies)
  {
    if(err)
    {
      console.log("error from db: " + err);
    }
    res.send(allMovies);
  });
});

router.delete("/delete/:id", function(req, res)
{
  var movieId = req.params.id;
  Movie.findByIdAndRemove(movieId, function(err)
  {
    if(err)
    {
      console.log("error from db: " + err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
