describe('Sync Configs Accessor', function(){

    var items = null;

    beforeEach(module('noteApp'));

    beforeEach(function(done) {

        items = [
                {id: "1", name: "note 1", type: "dropbox", date: new Date() },
                {id: "2", name: "note 2", body: "onedrive", date: new Date() }
            ];
    
        done();
    });    


    describe('list', function(){
        it('should return list of configs', function(done) {

            inject(function(syncConfigs, $timeout, $rootScope) {

                // VERY VERY VERY IMPORTANT
                // YOU MUST PUT ACTUAL UNIT TEST INSIDE OF A $scope.$apply
                $rootScope.$apply(function() {
                    should.exist(syncConfigs);
                
                    syncConfigs.seed(items);

                    syncConfigs.list().then(function(items) {
                        should.exist(items);
                        assert.equal(items.length, 2);
                        done();
                    });
                });             
            });
        });
    });
    
    describe('save', function(){
        it('should insert and return array with new config', function(done) {

            inject(function(syncConfigs, $timeout, $rootScope) {

                // VERY VERY VERY IMPORTANT
                // YOU MUST PUT ACTUAL UNIT TEST INSIDE OF A $scope.$apply
                $rootScope.$apply(function() {
                    should.exist(syncConfigs);
                
                    syncConfigs.seed(items);

                    items.push({ id: "3", name: "note 1", type: "dropbox", date: new Date() });

                    syncConfigs.save().then(function(items) {
                        should.exist(items);
                        assert.equal(items.length, 3);
                        done();
                    });
                });             
            });
        });
    });

    describe('save', function(){
        it('should update existing', function(done) {

            inject(function(syncConfigs, $timeout, $rootScope) {

                // VERY VERY VERY IMPORTANT
                // YOU MUST PUT ACTUAL UNIT TEST INSIDE OF A $scope.$apply
                $rootScope.$apply(function() {
                    should.exist(syncConfigs);
                
                    syncConfigs.seed(items);

                    items[0].name = "poop";

                    syncConfigs.save().then(function(items) {
                        should.exist(items);
                        assert.equal(items.length, 2);
                        assert.equal("poop", items[0].name);
                        done();
                    });
                });             
            });
        });
    });
});