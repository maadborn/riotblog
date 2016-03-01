var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var exorcist    = require('exorcist');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var riotify     = require('riotify');
var changed     = require('gulp-changed');

var scriptsEntry = './src/scripts/boot.js';
var sourceMapDest = './dist/scripts/bundle.js.map';
var bundleDest = './dist/scripts';

var stylesSrc = ['./src/styles/*.css'];
var stylesDest = './dist/styles';

var htmlSrc = './src/*.html';
var htmlDest = './dist';

// Input file
watchify.args.debug = true;
var bundler = watchify(browserify(scriptsEntry, watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    /*sourceMapRelative: 'app/js',*/
    presets: ['es2015']
}));

bundler.transform(riotify);

// On updates recompile
bundler.on('update', bundle);

function bundle() {
    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist(sourceMapDest))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(bundleDest))
        .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
    return bundle();
});

gulp.task('styles', function() {
    return gulp.src(stylesSrc)
        //concat, autoprefix, minify
        .pipe(gulp.dest(stylesDest));
});

gulp.task('html', function() {
    return gulp.src(htmlSrc)
        .pipe(changed(htmlDest))
        .pipe(gulp.dest(htmlDest));
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle', 'styles', 'html'], function () {
    gulp.watch(htmlSrc, ['html']);

    gulp.watch(stylesSrc, ['styles']);

    browserSync.init({
        server: "./dist"
    });
});