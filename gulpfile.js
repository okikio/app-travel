var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-csso');
// var imageop = require('gulp-imagemin');
// var fontGen = require('gulp-fontgen');
// var concat = require('gulp-concat-css');
var colors = require("colors");

function render(done) {
    return gulp.src('data/render.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('data')),
        console.log("Finished ... Render".red), done();
}

function js(done) {
    return gulp.src(['client/js/*.js', '!client/js/*.min.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/js')),

        gulp.src('client/js/*.min.js')
        .pipe(gulp.dest('public/js')),
        console.log("Finished ... JS".red), done();
}

function css(done) {
    return gulp.src('client/css/*.css')
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css')),
        console.log("Finished ... CSS".red), done();
}

gulp.task('render', render);
gulp.task('css', css);
gulp.task('js', js);

gulp.task('default', function(done) {
    return js(done), css(done), render(done), done();
});
