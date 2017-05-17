const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sasslint = require('gulp-sass-lint');
const minifyCSS = require('gulp-minify-css');
const minifyHTML = require('gulp-minify-html');
const uglify = require('gulp-uglify');
const jslint = require('gulp-jslint');
const scripts = require('./scripts');
const styles = require('./styles');
const html = require('./html');
var bower = require('gulp-bower');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

var devMode = false;

gulp.task('sass', function() {
    gulp.src(styles)
		.pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./app/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('sasslint', function() {
    gulp.src(styles)
        .pipe(sasslint())
		.pipe(sasslint.format());
});

gulp.task('js', function() {
    gulp.src(scripts)
        .pipe(concat('all.min.js'))
		.pipe(uglify())
        .pipe(gulp.dest('./app/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('jslint', function() {
    gulp.src(scripts)
        .pipe(jslint());
});

gulp.task('html', function() {
    gulp.src(html)
		.pipe(minifyHTML({
            conditionals: true
        }))
        .pipe(gulp.dest('./app/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('bower', function() {
    return bower('bower_components')
        .pipe(gulp.dest('./app/lib/'));
});


gulp.task('build', function() {
    gulp.start(['bower', 'sass', 'js', 'html'])
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('serve', function() {
    gulp.start(['build', 'browser-sync']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('default', ['serve']);