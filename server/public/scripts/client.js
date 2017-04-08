var myApp = angular.module("myApp", []);

myApp.controller("FirstController", ["$scope", "FirstFactory", function($scope, FirstFactory){
  $scope.searchTitle = FirstFactory.searchTitle;
  $scope.addMovie = FirstFactory.addMovie;

}]);

myApp.controller("SecondController", ["$scope", "FirstFactory", function($scope, FirstFactory){
  $scope.movies = FirstFactory.allMovies.movies;

}]);

myApp.factory("FirstFactory", ["$http", function($http){
  var searchTitle = "";
  var allMovies = {
    movies: []
  };
  var addMovie = function(name){
    var movie = {
      name: name,
    };
    allMovies.movies.push(movie);
    searchTitle = "";
  };

  return{
    searchTitle: searchTitle,
    allMovies: allMovies,
    addMovie: addMovie
  };
}]);
