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

var bundleFactory = {
    
    getWatchifyBundle: function() {
        // Bundle with options on entry file
        watchify.args.debug = true;
        var bundler = watchify(browserify(paths.scripts.bundleEntry, watchify.args));

        this._transformBundle(bundler);

        // Recompile scripts on updates
        bundler.on('update', this._bundle.bind(this, bundler));

        return this._bundle(bundler);
    },


    /*function getBrowserifyBundle() {

    }*/
    
    _transformBundle: function(_bundler) {
        // Babel transform
        _bundler.transform(babelify.configure({
            /*sourceMapRelative: 'app/js',*/
            presets: ['es2015']
        }));

        // Riot transform
        _bundler.transform(riotify);
    },
    
    _bundle: function(_bundler) {
        gutil.log('Compiling JS...');

        return _bundler.bundle()
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
};




//var buildBundler = browserify(paths.scripts.bundleEntry, watchify.args);

// Bundle task
gulp.task('bundle', function () {
    // return bundle();
    return bundleFactory.getWatchifyBundle();
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

// Build task
gulp.task('build', ['bundle', 'styles', 'html'], function() {
    
});

/**
 * Bundle, transform and move files for distribution,
 * then serve from the ./dist directory
 */
gulp.task('default', ['build'], function () {
    gulp.watch(paths.html.src, ['html']);

    gulp.watch(paths.styles.src, ['styles']);

    browserSync.init({
        server: "./dist"
    });
});