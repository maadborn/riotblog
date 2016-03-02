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

// Paths object
var paths = {
    scripts: {
        bundleEntry: './src/scripts/boot.js',
        bundleDest: './dist/scripts',
        sourceMapDest: './dist/scripts/bundle.js.map'
    },
    styles: {
        src: './src/styles/*.css',
        dest: './dist/styles'
    },
    html: {
        src: './src/*.html',
        dest: './dist'
    }
};

// Bundle with options on entry file
watchify.args.debug = true;
var bundler = watchify(browserify(paths.scripts.bundleEntry, watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    /*sourceMapRelative: 'app/js',*/
    presets: ['es2015']
}));

// Riot transform
bundler.transform(riotify);

// Recompile scripts on updates
bundler.on('update', bundle);

function bundle() {
    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist(paths.scripts.sourceMapDest))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.scripts.bundleDest))
        .pipe(browserSync.stream({once: true}));
}

// Bundle task
gulp.task('bundle', function () {
    return bundle();
});

// Styles transformation task TODO
gulp.task('styles', function() {
    return gulp.src(paths.styles.src)
        //concat, autoprefix, minify
        .pipe(gulp.dest(paths.styles.dest));
});

// Html move task
gulp.task('html', function() {
    return gulp.src(paths.html.src)
        // minify?
        .pipe(changed(paths.html.dest))
        .pipe(gulp.dest(paths.html.dest));
});

/**
 * Bundle, transform and move files for distribution,
 * then serve from the ./dist directory
 */
gulp.task('default', ['bundle', 'styles', 'html'], function () {
    gulp.watch(paths.html.src, ['html']);

    gulp.watch(paths.styles.src, ['styles']);

    browserSync.init({
        server: "./dist"
    });
});