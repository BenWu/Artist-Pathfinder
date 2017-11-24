const del = require('del');
const gulp = require('gulp');
const options = require('./webpack.config.js');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

const source = 'src/';
const dest = 'pathfinder/static';

gulp.task('js', function(done) {
    const path = source + 'js/**/*.js';
    del([dest + '/js']);
    options.watch = true;
    gulp.src(path)
        .pipe(webpack(options, require('webpack')))
        .pipe(gulp.dest(dest + '/js'))
        .on('end', done);
});

gulp.task('sass', function(done) {
    const path = source + 'style/**/*.scss';
    del([dest + '/css']);
    gulp.src(path)
        .pipe(sass({includePaths: path}))
        .pipe(gulp.dest(dest + '/css'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(source + 'style/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'js', 'sass']);
