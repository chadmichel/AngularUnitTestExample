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
      when('/config', {
        templateUrl: 'app/partials/configure.html',
        controller: 'ConfigureCtrl'
      }).
      otherwise({
        redirectTo: '/note/new'
      });
  }]);
