'use strict';

const gulp = require('gulp');
const path = require('path');
const task_name = path.basename(__filename, '.js');
const info = require('./../package.json');

const scan_structure = require('./../tools/scan_structure');
const streamqueue = require('streamqueue');
const insert = require('gulp-insert');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const ext = '.css';
const glob = [
    'sources/modules/**/*' + ext,
    '!sources/modules/**/test' + ext,
];

const task = () => new Promise((resolve, reject) => {
    // Сканирование нужно каждый раз при измении структуры?
    scan_structure('./sources/modules').then(structure => {

        const tasks = structure.map(item => {
            item.task_name = task_name + ':' + item.name;

            let file_name = 'kk'
            if (item.name !== 'core')
                file_name += '-' + item.name
            file_name += ext;

            const task = done => {
                const queue = streamqueue({ objectMode: true });

                // Главная часть
                queue.queue(
                    gulp.src(
                        path.join(item.path, 'main' + ext),
                        { allowEmpty: true })
                    .pipe(insert.wrap('/* kk-' + item.name + ' */\n', ''))
                );

                // Подмодули
                queue.queue(...item.submodules.map(submodule => gulp.src([
                        path.join(submodule.path, 'main' + ext),
                        path.join(submodule.path, '*' + ext),
                        '!' + path.join(submodule.path, 'test' + ext)
                    ],{ allowEmpty: true })
                    .pipe(concat(item.name + '.' +  submodule.name + ext))
                ));

                queue.done()
                    .pipe(concat(file_name))
                    .pipe(replace(/::version::/g, info.version))
                    .pipe(gulp.dest('build/bower-kk'))
                    .pipe(rename({suffix: '.min'}))
                    .pipe(csso().on('error', error => {
                        console.log(error);
                    }))
                    .pipe(gulp.dest('build/bower-kk'));

                done();
            }

            gulp.task(item.task_name, task);

            return item.task_name;

        });

        gulp.parallel(tasks)(resolve)
    });
});



gulp.task(task_name, task);
gulp.task('watch:' + task_name, () => gulp.watch(glob, gulp.task(task_name)));
// TODO: Для каждого модуля свой наблюдатель
