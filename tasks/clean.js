'use strict';

const gulp = require('gulp');
const path = require('path');
const task_name = path.basename(__filename, '.js');

const del = require('del');

const task = done => del([
    'build/**/*',
    '!build/package',
    'build/package/**/*',
    '!build/package/.git'
], done);

gulp.task(task_name, task);
