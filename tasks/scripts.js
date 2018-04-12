'use strict';

const gulp = require('gulp');
const path = require('path');
const task_name = path.basename(__filename, '.js');
const info = require('./../package.json');

const scan_structure = require('./../tools/scan_structure');
// const uglify_error_handler = require('./../tools/uglify_error_handler');
//const ms = require('./../tools/ms');
const streamqueue = require('streamqueue');
const insert = require('gulp-insert');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const minify = require("gulp-babel-minify");
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const clone = require('gulp-clone');

const ext = '.js'
const glob = [
    'sources/modules/**/*' + ext,
    '!sources/modules/**/test.' + ext,
];

const wraps = {
    empty: ['(() => {\n', '\n})();\n'],
    kk: ['(kk => {\n', '\n})(kk);\n']
}

const task = () => new Promise((resolve, reject) => {
    // Сканирование нужно каждый раз при измении структуры
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
                    .pipe(insert.wrap(...
                        item.name === 'core' ? wraps.empty: wraps.kk
                    ))
                );

                // Подмодули
                queue.queue(...item.submodules.map(submodule => gulp
                    .src([
                        path.join(submodule.path, 'main' + ext),
                        path.join(submodule.path, '*' + ext),
                        '!' + path.join(submodule.path, 'test' + ext)
                    ],{ allowEmpty: true })
                    .pipe(concat(item.name + '.' +  submodule.name + ext))
                    .pipe(insert.wrap(...wraps.kk))
                ));

                const source = queue.done()
                    .pipe(concat(file_name))
                    .pipe(replace(/::version::/g, info.version))
                    .pipe(insert.wrap('\'use strict\';\n\n', ''))
                    .pipe(gulp.dest('build/package'))

                const min = source.pipe(clone())
                    .pipe(rename({suffix: '.min'}))
                    .pipe(minify({
                        mangle: {
                            keepClassName: true
                        }
                    }))
                    .pipe(gulp.dest('build/package'))

                const es5 = source.pipe(clone())
                    .pipe(rename({suffix: '.es5'}))
                    .pipe(rename({suffix: '.min'}))
                    .pipe(babel({
                        presets: ['env']
                    }))
                    .pipe(minify({
                        mangle: {
                            keepClassName: true
                        }
                    }))
                    .pipe(gulp.dest('build/package'));

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
