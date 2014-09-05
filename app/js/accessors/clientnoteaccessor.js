
angular.module("noteApp").service('clientNoteAccessor', ['$rootScope', '$q', 'guid', function($rootScope, $q, guid) {

	var listKey = "notes_list.json";
	var itemKey = "note_";

	function ClientNoteAccessor() {

		var self = this;

		self.notes = [];

		function copy(source, dest) {
			dest.id = source.id;
			dest.title = source.title;			
			dest.date = source.date;
		}

		function makeAsync(f) {
			setTimeout(function() {
				$rootScope.$apply(function() {
					f();
				});
			}, 0);
		}

		self.seed = function(seedNotes) {
			localStorage.clear();
			localStorage[listKey] = null;
			self.notes = seedNotes;
			self.saveList();
		};

		self.list = function() {

			var promise = $q.defer();
			makeAsync(function() {
				promise.resolve(self.notes);
			});			
			return promise.promise;

		};

		self.saveList = function() {
			localStorage[listKey] = JSON.stringify(self.notes);
		};

		self.loadList = function() {
			if (self.notes == null) 
				self.notes = [];

			var json = localStorage[listKey];
			if (json != null)
				self.notes = JSON.parse(json);
		};

		self.find = function(id) {

			var promise = $q.defer();

			makeAsync(function() {

				var item = null;

				for(var i = 0; i < self.notes.length; i++) {
					var tmp = self.notes[i];
					if (tmp.id == id) {
						item = {};
						copy(tmp, item);
						break;		
					}
				}

				var json = localStorage[itemKey + item.id];
				if (json != null) {
					var loaded = JSON.parse(json);
					if (loaded != null) {
						item.title = loaded.title; // keep up to date
						item = loaded; // use loaded version
					}
				}

				promise.resolve(item);
				
			});

			return promise.promise;
		};

		self.save = function(note) {

			var promise = $q.defer();

			makeAsync(function() {

				var item = null;

				if (note != null) {		

					// does note have an id
					if (note.id == null || note.id == '' || note.id == 'new') {
						note.id = guid();
					}							
					note.date = new Date();

					var updated = false;
					for(var i = 0; i < self.notes.length; i++) {
						var tmp = self.notes[i];
						if (tmp.id == note.id) {					
							item = tmp;
							copy(note, item);
							item.needsSync = true;
							updated = true;
							break;
						}
					}

					if (!updated) {
						item = {};
						copy(note, item);
						item.needsSync = true;
						self.notes.push(item);
					}

					// update the actual note
					localStorage[itemKey + note.id] = JSON.stringify(note);
					self.saveList();
				}

				promise.resolve(item);
				
			});

			return promise.promise;
		};
	}
  
  	var result = new ClientNoteAccessor();
  	result.loadList();
  	return result;

}]);