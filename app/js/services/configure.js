// backend node service for configuration


angular.module("noteApp").service('clientNoteAccessor', 
    ['$rootScope', '$q', 'guid', 'makeAysnc',
    function($rootScope, $q, guid, makeAsync) {