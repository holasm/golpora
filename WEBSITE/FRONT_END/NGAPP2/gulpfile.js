'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
 
gulp.task('sass', function () {
  return gulp.src('./app/styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./app/styles/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./app/styles/sass/**/*.scss', ['sass']);
});


gulp.task('default', ['sass', 'sass:watch']);