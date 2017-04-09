var myApp = angular.module("myApp", []);

myApp.controller("FirstController", ["$scope", "FirstFactory", function($scope, FirstFactory){
  $scope.searchTitle = FirstFactory.searchTitle;
  $scope.getMovie = FirstFactory.getMovie;
}]);

myApp.controller("SecondController", ["$scope", "FirstFactory", function($scope, FirstFactory){
  $scope.searchedMovie = FirstFactory.searchedMovie;
  $scope.makeFavorite = FirstFactory.makeFavorite;
  $scope.removeFavorite = FirstFactory.removeFavorite;
  $scope.starredMovies = FirstFactory.starredMovies;
  FirstFactory.getMyMovies();
}]);

myApp.factory("FirstFactory", ["$http", "$window", function($http, $window){
  var searchTitle = "";
  var searchedMovie = {};
  var getMovie = function(name){
    $http.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=full&r=json").then(function(response){
      searchedMovie.name = response.data.Title;
      searchedMovie.director = response.data.Director;
      searchedMovie.genre = response.data.Genre;
      searchedMovie.plot = response.data.Plot;
      searchedMovie.poster = response.data.Poster;
      searchedMovie.rated = response.data.Rated;
      searchedMovie.released = response.data.Released;
      searchedMovie.runtime = response.data.Runtime;
      searchedMovie.exists = response.data.Response;
      searchTitle = "";
    });
  };
  var starredMovies = [];
  var getMyMovies = function(){
    starredMovies.favorites = [];
    $http.get("/movies/pull").then(function(response)
    {
      for(i = 0; i < response.data.length; i++)
      {
        starredMovies[i] = angular.copy(response.data[i]);
      }
    });
  };
  var makeFavorite = function(thisMovie){
    $http.post("/movies/add", thisMovie).then(function()
    {
      getMyMovies();
    });
  };
  var removeFavorite = function(thisId){
    var id = thisId;
    $http.delete("/movies/delete/" + id).then(function()
    {
      getMyMovies();
      //This does not refresh....
    });
  };
  return{
    searchTitle: searchTitle,
    searchedMovie: searchedMovie,
    getMovie: getMovie,
    makeFavorite: makeFavorite,
    getMyMovies: getMyMovies,
    starredMovies: starredMovies,
    removeFavorite: removeFavorite
  };
}]);
