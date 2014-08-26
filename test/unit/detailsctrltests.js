describe('Details Controller', function(){

	beforeEach(module('noteApp'));

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
				
				// VERY VERY VERY IMPORTANT
				// YOU MUST PUT ACTUAL UNIT TEST INSIDE OF A $scope.$apply
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