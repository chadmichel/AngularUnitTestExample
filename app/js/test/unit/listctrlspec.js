describe('ListCtrl', function() {

    var scope, ctrl;

    beforeEach(module('noteApp'));

    beforeEach(inject(function($controller) {
      scope = {};
      ctrl = $controller('ListCtrl', {$scope:scope});
    }));

    it('should have some notes', function() {
      expect(scope.notes.length).toBe(2);
    });


});