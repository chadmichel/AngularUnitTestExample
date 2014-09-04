
angular.module("noteApp").controller('DetailsCtrl', ['$scope', '$routeParams', '$rootScope', '$location', 'clientNoteAccessor', function ($scope, $routeParams, $rootScope, $location, clientNoteAccessor) {

	$scope.notes = [];

	clientNoteAccessor.list().then(function(items) {
		$scope.notes = items;
	});
		
	function setBlankNote() {
		$scope.note = {
			id: '',
			title: '',
			body: '',
			date: new Date()
		};
	}
	setBlankNote();

	if ($routeParams.id != null && $routeParams.id != "new") {
	 	clientNoteAccessor.find($routeParams.id).then(function(result) {
			if (result != null)
				$scope.note = result;	
			else 
				setBlankNote();
		});
	}

	$scope.save = function() {
		clientNoteAccessor.save($scope.note).then(function (result) {
			$location.path("/note/" + result.id);
		});
	};
	
	$scope.back = function() {
		clientNoteAccessor.save($scope.note).then(function (result) {
			$location.path("/list");
		});
	};

}]);

