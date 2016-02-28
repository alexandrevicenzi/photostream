var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    minifyJs = require('gulp-uglify');

gulp.task('minify', function () {
  return gulp.src('src/*.js')
    .pipe(minifyJs({
        preserveComments: 'license'
    }))
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
    return gulp.src('src/*.js')
        .pipe(jshint({
            curly: true,
            eqeqeq: true,
            latedef: true,
            undef: true,
            unused: true,
            eqnull: true,
            browser: true,
            jquery: true
        }))
        .pipe(jshint.reporter("default"));
});

gulp.task('default', ['lint', 'minify']);
