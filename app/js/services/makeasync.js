
angular.module("noteApp").service('makeAysnc', ['$rootScope', function($rootScope) {

    var makeAysnc = function (f) {
        setTimeout(function() {
            $rootScope.$apply(function() {
                f();
            });
        }, 0);        
    };
  
    return makeAysnc;

}]);