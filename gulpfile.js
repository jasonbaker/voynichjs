var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
  default: {
    dbpath: 'bin/vch.db',
    srcpath: './voynich.txt',
  }
});

gulp.task('test', function() {
  return gulp.src('spec/**/*_spec.js') 
    .pipe(jasmine());
});