var myApp = angular.module("myApp", []);

//CONTROLLERS

//FirstController takes in title from input and performs get to search
myApp.controller("FirstController", ["$scope", "FirstFactory", function($scope, FirstFactory){
  $scope.searchTitle = FirstFactory.searchTitle;
  $scope.getMovie = FirstFactory.getMovie;
}]);

//SecondController appends found movie and adds or deletes from favorites
myApp.controller("SecondController", ["$scope", "FirstFactory", function($scope, FirstFactory){
  $scope.searchedMovie = FirstFactory.searchedMovie;
  $scope.makeFavorite = FirstFactory.makeFavorite;
  $scope.removeFavorite = FirstFactory.removeFavorite;
  $scope.starredMovies = FirstFactory.starredMovies;
  FirstFactory.getMyMovies();
}]);

//FACTORY
myApp.factory("FirstFactory", ["$http", function($http){
  var searchTitle = "";
  var searchedMovie = {};

//getMovie pulls searched movie from OMDB
  var getMovie = function(name){
    $http.get("https://www.omdbapi.com/?t=" + name + "&y=&plot=full&r=json").then(function(response){
      searchedMovie.name = response.data.Title;
      searchedMovie.director = response.data.Director;
      searchedMovie.genre = response.data.Genre;
      searchedMovie.plot = response.data.Plot;
      searchedMovie.poster = response.data.Poster;
      searchedMovie.rated = response.data.Rated;
      searchedMovie.released = response.data.Released;
      searchedMovie.runtime = response.data.Runtime;
      searchedMovie.exists = response.data.Response;
    });
  };

//getMyMovies pulls from user's database to display favorited movies
  var starredMovies = [];
  var getMyMovies = function(){
    $http.get("/movies/pull").then(function(response)
    {
      for(i = 0; i <= response.data.length; i++)
      {
        if(response.data[i])
        {
          starredMovies[i] = angular.copy(response.data[i]);
        }
      }
    });
  };

//Adds new favorited movie to user database
  var makeFavorite = function(thisMovie){
    $http.post("/movies/add", thisMovie).then(getMyMovies());
  };

//Removes favorited movie to user database
  var removeFavorite = function(thisId){
    var id = thisId;
    starredMovies.pop();
    $http.delete("/movies/delete/" + id).then(getMyMovies());
  };

//Factory returns
  return{
    searchTitle: searchTitle,
    searchedMovie: searchedMovie,
    getMovie: getMovie,
    makeFavorite: makeFavorite,
    getMyMovies: getMyMovies,
    starredMovies: starredMovies,
    removeFavorite: removeFavorite
  };
  
//End of FirstFactory
}]);
