var noteApp = angular.module('noteApp', [
  'ngRoute', 'textAngular'
]);

noteApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/note/:id', {
        templateUrl: 'app/partials/note-details.html',
        controller: 'DetailsCtrl'
      }).
      when('/configure', {
        templateUrl: 'app/partials/configure.html',
        controller: 'DetailsCtrl'
      }).
      otherwise({
        redirectTo: '/note/new'
      });
  }]);
