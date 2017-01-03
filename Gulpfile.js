'use strict';


var gulp = require('gulp');
var pkg = require('./package.json');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var comment = '\/*\r\n* RETROFIT ' + pkg.version + '\r\n* Copyright 2016, Evan Kysley\r\n* http:\/\/retrofit.space\/\r\n* Free to use under the MIT license.\r\n* https:\/\/kysley.github.io\/license\r\n*\/\r\n';
var $ = require('gulp-load-plugins')();

gulp.task('watch', function() {
  gulp.watch('./**/*.scss', ['build']);
});

gulp.task('build', function() {
  gulp.src('./*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe($.concat('retrofit.css'))
    .pipe($.header(comment + '\n'))
    .pipe($.size())
    .pipe(gulp.dest('./dist'))
});

gulp.task('minify', function() {
  gulp.src('./*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe($.concat('retrofit.min.css'))
    .pipe($.header(comment + '\n'))
    .pipe($.size())
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['build', 'minify']);