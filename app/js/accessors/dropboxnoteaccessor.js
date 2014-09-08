
angular.module("noteApp").service('dropboxNoteAccessor', ['$rootScope', '$q', 'guid', function($rootScope, $q, guid) {

    function DropBoxNoteAccessor() {

        var self = this;        
    }

    var result = new DropBoxNoteAccessor();
    return result;

}]);