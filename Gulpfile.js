'use strict';


var gulp = require('gulp');
var pkg = require('./package.json');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var comment = '\/*\r\n* RETROFIT ' + pkg.version + '\r\n* Copyright 2016, Evan Kysley\r\n* http:\/\/retrofit.space\/\r\n* Free to use under the MIT license.\r\n* https:\/\/kysley.github.io\/license\r\n*\/\r\n';
var $ = require('gulp-load-plugins')();
var pug = require('gulp-pug');



gulp.task('build', function () {
	return gulp.src(['./src/toc.css', './src/base.css', './src/typography.css', './src/grid.css', './src/links.css', './src/buttons.css', './src/lists.css', './src/forms.css', './src/util.css', './src/misc.css'])
		.pipe($.concat('retrofit.css'))
		.pipe($.header(comment + '\n'))
		.pipe($.size())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function() {
  return gulp.src(['./dist/retrofit.css'])
    .pipe(minifyCSS())
    .pipe($.header(comment))
    .pipe($.size())
    .pipe($.concat('retrofit.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.css'], ['default']);
});

gulp.task('sass', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
});

gulp.task('default', ['build', 'minify']);

// gulp.task('pug',function(){
// 	return gulp.src('*.pug')
// 		.pipe(pug({pretty: true}))
// 		.pipe(gulp.dest('./'));
// });

// gulp.task('default', function() {
// 	gulp.watch('sass/**/*.scss',['sass']);
// 	gulp.watch('*.pug',['pug']);
// });