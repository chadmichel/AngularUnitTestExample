describe('Client Note Accessor', function(){

	beforeEach(module('noteApp'));

	var items = [
		{id: "1", title: "note 1", body: "body 1", date: new Date() },
		{id: "2", title: "note 2", body: "body 2", date: new Date() }
	];

	describe('list', function(){
		it('should return list of notes', function(done) {

			inject(function(clientNoteAccessor, $timeout, $rootScope) {

				// VERY VERY VERY IMPORTANT
				// YOU MUST PUT ACTUAL UNIT TEST INSIDE OF A $scope.$apply
				$rootScope.$apply(function() {
					should.exist(clientNoteAccessor);
				
					clientNoteAccessor.seed(items);

					clientNoteAccessor.list().then(function(items) {
						should.exist(items);
						assert.equal(items.length, 2);
						done();
					});

				});
				
			});
		});
	});


	describe('save', function(){
		it('should save item and update list', function(done) {

			inject(function(clientNoteAccessor, $timeout, $rootScope) {

				// VERY VERY VERY IMPORTANT
				// YOU MUST PUT ACTUAL UNIT TEST INSIDE OF A $scope.$apply
				$rootScope.$apply(function() {
					should.exist(clientNoteAccessor);
				
					clientNoteAccessor.seed([]]);

					var note = {id: "1", title: "note 1", body: "body 1", date: new Date() };

					clientNoteAccessor.save(note).then(function(result) {
						should.exist(result);						
						done();
					});

				});
				
			});
		});
	});
})