const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sasslint = require('gulp-sass-lint');
const minifyCSS = require('gulp-minify-css');
const minifyHTML = require('gulp-minify-html');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const scripts = require('./scripts');
const styles = require('./styles');
const html = require('./html');
const bower = require('gulp-bower');
const babel = require("gulp-babel");
const nodemon = require("gulp-nodemon");
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const reload = browserSync.reload;

gulp.task('sass', function() {
  gulp.src(styles)
  .pipe(sass())
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
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./app/js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('jshint', function() {
  gulp.src(scripts)
  .pipe(jshint());
});

gulp.task('html', function() {
  gulp.src(html)
  .pipe(gulp.dest('./app/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('resources', function() {
  return gulp.src(['./src/app/services/**/*.json', './src/**/*.png'])
  .pipe(gulp.dest('./app/'));
});

gulp.task('bower', function() {
  return bower('bower_components')
  .pipe(gulp.dest('./app/lib/'));
});


gulp.task('build', function() {
  gulp.start(['bower', 'sass', 'js', 'html', 'resources'])
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000"
  });
});

gulp.task('nodemon', function(cb) {
  var stared = false;
  return nodemon({
    script: 'index.js'
  }).on('start', function() {
    if(!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('serve', function() {
  gulp.start(['build', 'browser-sync']);
  gulp.watch(styles, ['sass']);
  gulp.watch(html, ['html']);
  gulp.watch(scripts, ['js']);
});

gulp.task('serveprod', function() {
  connect.server({
    root: 'app',
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

gulp.task('default', ['serve']);
