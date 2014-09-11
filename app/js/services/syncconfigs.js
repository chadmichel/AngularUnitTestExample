
angular.module("noteApp").service('syncConfigs', 
    ['$rootScope', '$q', 'guid', 'makeAysnc', 
    function($rootScope, $q, guid, makeAsync) {

    var configKey = "configs.json";

    function SyncConfigs() {

        var self = this;        
        self.configList = null;

        self.seed = function(seedItems) {
            localStorage.clear();
            localStorage[configKey] = null;
            self.configList = seedItems;
            self.save();
        };

        self.list = function() {

            var promise = $q.defer();
            makeAsync(function() {

                if (self.configList == null) {

                    var json = localStorage[configKey];
                    if (json != null)
                        self.configList = JSON.parse(json);

                }                

                promise.resolve(self.configList);
            });         
            return promise.promise;
        };

        self.save = function() {

            var promise = $q.defer();
            makeAsync(function() {
                localStorage[configKey] = JSON.stringify(self.configList);
                promise.resolve(self.configList);
            });

            return promise.promise;
        };

    }

    var result = new SyncConfigs();
    return result;

}]);