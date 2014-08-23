var noteApp = angular.module('noteApp', [
  'ngRoute'
]);

noteApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/list', {
        templateUrl: 'app/partials/note-list.html',
        controller: 'ListCtrl'
      }).
      when('/note/:id', {
        templateUrl: 'app/partials/note-details.html',
        controller: 'DetailsCtrl'
      }).
      otherwise({
        redirectTo: '/list'
      });
  }]);
