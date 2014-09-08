module.exports = function(config) {
  config.set({
    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/unit.app.js',
      'app/js/accessors/*.js',
      'app/js/controllers/*.js',
      'test/unit/**/*.js'
    ],
    basePath: '../',
    frameworks: ['mocha', 'chai'],
    reporters: ['progress', 'html'],
    browsers: ['Chrome'],
    autoWatch: true,
    singleRun: false,
    colors: true,
  });
};
