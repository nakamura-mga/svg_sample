var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssbeautify = require('gulp-cssbeautify'),
    jsprettify = require('gulp-jsbeautifier'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    del = require('del');

var paths = {
    base: './htdocs',
    jade: './htdocs/jade/*.jade',
    html: './htdocs/**/*.html',
    scss: './htdocs/scss/*.scss',
    css:  './htdocs/**/*.css',
    js:   './htdocs/**/*.js',
    img:  './htdocs/**/img/*',
    inc:  './htdocs/**/*.inc',
    dist: './dist'
}

gulp.task('server', function(){
  browserSync({
    server: {
      baseDir: paths.base
    },
    open: 'external',
    // xip: true,
  });
});

gulp.task('jade', function() {
   gulp
    .src(paths.jade)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.base))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function(){
  gulp
    .src(paths.html)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
  gulp
    .src(paths.scss)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./htdocs/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function() {
  gulp
    .src(paths.css)
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(gulp.dest(paths.dist))
});

gulp.task('js', function(){
  gulp
    .src(paths.js)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(jsprettify())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function(){
  gulp
    .src(paths.img)
    .pipe(plumber())
    .pipe(changed(paths.dist))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function(cb) {
  del(paths.dist, cb);
});

gulp.task('watch', function(){
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.img, ['img']);
});

gulp.task('build', ['clean'], function(){
  gulp.start('create');
});

gulp.task('build-sync', ['clean'], function(){
  gulp.start('create');
  gulp.start('watch');
});

gulp.task('create', ['html', 'css', 'js', 'img']);
gulp.task('default', ['watch', 'server']);
