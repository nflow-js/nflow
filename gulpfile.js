var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'])
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('watch', function() {
    gulp.watch(['src/**', 'test/**'], ['build','mocha']);
});

gulp.task('build', function() {
  gulp.src(['src/**/*.js'])
    //.pipe(browserify())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('flow.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
})