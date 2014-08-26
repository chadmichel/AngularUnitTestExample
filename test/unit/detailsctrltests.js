describe('Details Controller', function(){

	beforeEach(module('noteApp'));

	describe('new', function(){
		it('should load blank note', function(done) {

			inject(function(clientNoteAccessor, $timeout, $rootScope, $controller) {

				clientNoteAccessor.seed([]);

				var scope = $rootScope.$new();

				var detailsCtrl = $controller("DetailsCtrl", 
					{	$scope: scope, 
						$routeParams: { id: "new"},
						$location: { path: function() {} },
						clientNoteAccessor: clientNoteAccessor
					});
				
				$rootScope.$apply(function() {
					should.exist(detailsCtrl);
					should.exist(scope.note);					
					done();
				});				
			});
		});
	});

	describe('load existing', function(){
		it('should load existing note', function(done) {

			inject(function(clientNoteAccessor, $timeout, $rootScope, $controller) {

				var items = [
					{id: "1", title: "note 1", body: "body 1", date: new Date() },
				];

				clientNoteAccessor.seed(items);

				clientNoteAccessor.findInternal = clientNoteAccessor.save;
				clientNoteAccessor.findCnt = 0;
				clientNoteAccessor.find = function(id) {
					clientNoteAccessor.findCnt++;
					return clientNoteAccessor.findInternal(id);
				};

				var scope = $rootScope.$new();

				var detailsCtrl = $controller("DetailsCtrl", 
					{	$scope: scope, 
						$routeParams: { id: "1"},
						$location: { path: function() {} },
						clientNoteAccessor: clientNoteAccessor
					});
				
				$rootScope.$apply(function() {
					should.exist(detailsCtrl);
					should.exist(scope.note);					
					assert.equal(1, clientNoteAccessor.findCnt);
					done();
				});				
			});
		});
	});

	describe('save', function(){
		it('should save a note', function(done) {

			inject(function(clientNoteAccessor, $timeout, $rootScope, $controller) {

				clientNoteAccessor.seed([]);

				clientNoteAccessor.saveInternal = clientNoteAccessor.save;
				clientNoteAccessor.saveCnt = 0;
				clientNoteAccessor.save = function(item) {
					clientNoteAccessor.saveCnt++;
					return clientNoteAccessor.saveInternal(item);
				};

				var scope = $rootScope.$new();

				var detailsCtrl = $controller("DetailsCtrl", 
					{	$scope: scope, 
						$routeParams: { id: "new"},
						$location: { path: function() {} },
						clientNoteAccessor: clientNoteAccessor
					});
				
				$rootScope.$apply(function() {
					should.exist(detailsCtrl);
					
					should.exist(scope.note);

					scope.note.title = "hello";
					scope.note.body = "howdy";

					assert.equal(0, clientNoteAccessor.saveCnt);

					scope.save();

					assert.equal(1, clientNoteAccessor.saveCnt);

					done();
				});				
			});
		});
	});

});