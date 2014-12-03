var gulp = require('gulp'),
    gutil = require('gulp-util'),
    es = require('event-stream'),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    'static': './static/**/*.*',
    'build': '../kk-build',
    'sources' : './sources'
};

var regjs = function(keys){
    if (typeof keys === 'string') keys = [keys];
    if (!(keys instanceof Array)) return false;

    keys.forEach(function(key){
        paths[key] = [
            paths.sources + '/' + key + '/base.js',
            paths.sources + '/' + key + '/*.js'
        ];
    });
}

regjs(['core', 'node', 'ui']);

gulp.task('static', function(){
    return gulp
        .src(paths.static)
        .pipe(gulp.dest(paths.build));
});

gulp.task('scripts', function(){
    var core = gulp
        .src(paths.core)
        .pipe(sourcemaps.init())
        .pipe(concat('core.js'))

    var node = gulp
        .src(paths.node)
        .pipe(sourcemaps.init())
        .pipe(concat('node.js'))

    var ui = gulp
        .src(paths.ui)
        .pipe(sourcemaps.init())
        .pipe(concat('ui.js'))

    return es
        .merge(core, node, ui)
        .pipe(rename({prefix:'kk.'}))
        .pipe(gulp.dest(paths.build))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify().on("error", gutil.log))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function(){
    gulp.watch(paths.static, ['static']);
    gulp.watch('./sources/**/*.js', ['scripts']);
});

gulp.task('clean', function(callback){
    del([paths.build + '/**/*', '!' + paths.build +'/.git'], {force: true}, callback);
});

gulp.task('build', ['static', 'scripts']);
gulp.task('default', ['build', 'watch']);
