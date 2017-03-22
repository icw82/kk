'use strict';

const gulp = require('gulp');
const path = require('path');
const task_name = path.basename(__filename, '.js');
const info = require('./../package.json');

const concat = require('gulp-concat');

const glob = ['sources/modules/**/test.js']

gulp.task(task_name, () => gulp
    .src(glob, { allowEmpty: true })
    .pipe(concat('test.js'))
    .pipe(gulp.dest('build/test'))
);

gulp.task('watch:' + task_name, () => gulp.watch(glob, gulp.task(task_name)));
