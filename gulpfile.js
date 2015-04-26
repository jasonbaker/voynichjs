var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    svc = require('./src/services.js');

require('./src/gulpservices.js');

gulp.task('dbgen', function() {
  var gen = svc.get('dbgen');
  gen.run();
});

gulp.task('test', function() {
  return gulp.src('spec/**/*_spec.js') 
    .pipe(jasmine());
});