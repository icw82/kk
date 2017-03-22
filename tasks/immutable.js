'use strict';

const gulp = require('gulp');
const path = require('path');
const task_name = path.basename(__filename, '.js');
const info = require('./../package.json');

const replace = require('gulp-replace');
const glob = 'sources/immutable/**/*.*';

const task = () => gulp
    .src(glob)
    .pipe(replace(/::version::/g, info.version))
    .pipe(gulp.dest('build'));

gulp.task(task_name, task);
gulp.task('watch:' + task_name, () => gulp.watch(glob, gulp.task(task_name)));
