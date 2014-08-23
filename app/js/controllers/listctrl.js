
angular.module("noteApp").controller('ListCtrl',['$scope', '$location', 'clientNoteAccessor', function ($scope, $location, clientNoteAccessor) {
  
  $scope.notes = [];

  clientNoteAccessor.list().then(function(items) {
  	$scope.notes = items;
  });

  $scope.newNote = function() {
  	$location.path("/note/" + "new");
  };

}]);


