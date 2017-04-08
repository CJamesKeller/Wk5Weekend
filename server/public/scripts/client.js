var myApp = angular.module("myApp", []);

myApp.controller("FirstController", ["$scope", "FirstFactory", function($scope, FirstFactory){
  $scope.searchTitle = FirstFactory.searchTitle;
  $scope.getMovie = FirstFactory.getMovie;

}]);

myApp.controller("SecondController", ["$scope", "FirstFactory", function($scope, FirstFactory){
  $scope.searchedMovie = FirstFactory.searchedMovie;
  $scope.makeFavorite = FirstFactory.makeFavorite;
  $scope.starredMovies = FirstFactory.favoriteMovies.starredMovies;

}]);

myApp.factory("FirstFactory", ["$http", function($http){
  var searchTitle = "";

  var searchedMovie = {};

  var getMovie = function(name){
    $http.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=full&r=json").then(function(response){
      console.log(response);
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

  var favoriteMovies = {
    starredMovies: []
  };

  var makeFavorite = function(thisMovie){
    favoriteMovies.starredMovies.push(thisMovie);
  };

  return{
    searchTitle: searchTitle,
    searchedMovie: searchedMovie,
    getMovie: getMovie,
    makeFavorite: makeFavorite,
    favoriteMovies: favoriteMovies,
  };
}]);
