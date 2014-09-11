
angular.module("noteApp").controller('ConfigureCtrl', 
    ['$scope', '$routeParams', '$rootScope', '$location', 'syncConfigs', 
    function ($scope, $routeParams, $rootScope, $location, syncConfigs) {

    $scope.configs = [];

    syncConfigs.list().then(function(items) {
        $scope.configs = items;
    });
        

    function setBlankConfig() {
        $scope.config = {
            id: '',
            type: 'dropbox',
            date: new Date()
        };
    }

    if ($routeParams.id != null && $routeParams.id != "new") {
        syncConfigs.find($routeParams.id).then(function(result) {
            if (result != null)
                $scope.config = result;   
            else 
                setBlankConfig();
        });
    }

    $scope.save = function() {
        syncConfigs.save().then(function (result) {
            $scope.configs = result;
        });
    };
    

}]);

