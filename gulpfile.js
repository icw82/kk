var fs = require('fs'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    es = require('event-stream'),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

var globs = {
    static: ['static/**/*', '!static/bower-kk'],
    test: ['sources/**/*.test.js'],
    scripts: ['sources/**/*.js', 'sources/**/*.test.js'],
    qunit: {
        js: '',
        css: ''
    }
}

gulp.task('clean', function(callback) {
    del.sync([
        'build/**/*',
        '!build/bower-kk',
        'build/bower-kk/**/*',
        '!build/bower-kk/.git'
    ]);

    callback();
});

gulp.task('static', function() {
    var dev = gulp
        .src(globs.static)
        .pipe(gulp.dest('build'));

    var bower = gulp
        .src(['static/bower-kk'])
        .pipe(gulp.dest('build'));

    return es
        .merge(dev, bower);
});

gulp.task('test', function() {
    return gulp
        .src(globs.test)
        .pipe(concat('test.js'))
        .pipe(gulp.dest('build/test'));
});

gulp.task('scripts', function() {
    fs.readdir('sources', function(errors, list) {
        if (errors) return false;

        var ext = 'js',
            streams = [];

        list.forEach(function(name) {
            if (fs.statSync('sources/' + name).isDirectory()) {
                var paths = [
                    'sources/' + name + '/base.' + ext,
                    'sources/' + name + '/*.' + ext,
                    '!sources/' + name + '/*.test.' + ext
                ];

                if (name === 'core')
                    name = 'kk';
                else
                    name = 'kk-' + name;

                var stream = gulp
                    .src(paths)
                    .pipe(sourcemaps.init())
                    .pipe(concat(name + '.' + ext));

                streams.push(stream);
            }
        });

        es.merge.apply(this, streams)
            .pipe(gulp.dest('build/scripts'))
            .pipe(gulp.dest('build/bower-kk'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify().on("error", gutil.log))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('build/scripts'))
            .pipe(gulp.dest('build/bower-kk'));
    });
});

gulp.task('styles', function() {
    fs.readdir('sources', function(errors, list) {
        if (errors) return false;

        var ext = 'css',
            streams = [];

        list.forEach(function(name) {
            if (fs.statSync('sources/' + name).isDirectory()) {
                var path = 'sources/' + name + '/*.' + ext;

                if (name === 'core')
                    name = 'kk';
                else
                    name = 'kk-' + name;

                var stream = gulp
                    .src(path)
                    .pipe(concat(name + '.' + ext));

                streams.push(stream);
            }
        });

        es.merge.apply(this, streams)
            .pipe(gulp.dest('build/styles'))
            .pipe(gulp.dest('build/bower-kk'))
    });
});

gulp.task('qunit', function() {
    return gulp
        .src(['bower_components/qunit/qunit/*'])
        .pipe(gulp.dest('build/test/qunit/'));

});

gulp.task('build', ['static', 'test', 'scripts', 'styles', 'qunit']);

gulp.task('watch', function() {
    gulp.watch(globs.static, ['static']);
    gulp.watch(globs.test, ['test']);
    gulp.watch(globs.scripts, ['scripts']);
});

gulp.task('default', ['clean', 'build', 'watch']);
