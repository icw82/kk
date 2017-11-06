'use strict';

const gulp = require('gulp');
const path = require('path');
const task_name = path.basename(__filename, '.js');
const info = require('./../package.json');

gulp.task(task_name + ':qunit', () => gulp
    .src(['node_modules/qunit/qunit/*'])
    .pipe(gulp.dest('build/test/qunit/'))
);

gulp.task(task_name, gulp.parallel(
    task_name + ':qunit'
));
