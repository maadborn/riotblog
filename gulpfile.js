'use strict';

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var babelify    = require('babelify');
var watchify    = require('watchify');
var browserify  = require('browserify');
var browserSync = require('browser-sync');
var sourcemaps  = require('gulp-sourcemaps');
var riotify     = require('riotify');
var changed     = require('gulp-changed');
var del         = require('del');

// Paths object
var paths = {
    scripts: {
        bundleEntry: './src/scripts/boot.js',
        bundleDest: './dist/scripts',
        bundleFilename: 'bundle.js',
        sourceMapDest: './dist/scripts/bundle.js.map',
        sourceMapFilename: 'bundle.js.map'
    },
    styles: {
        src: './src/styles/*.css',
        dest: './dist/styles',
        distGlob: './dist/**/*.css'
    },
    html: {
        src: './src/*.html',
        dest: './dist',
        distGlob: './dist/**/*.html'
    },
    clean: './dist/**'
};

// Prepare scripts for package/distribution/browser
function compile(watch) {
    var bundler = browserify(paths.scripts.bundleEntry, { debug: true })
        .transform(babelify.configure({ presets: ['es2015'] }))
        .transform(riotify, { ext: '.tag.html' });
	
    var watcher = watch ? watchify(bundler) : '';

    if (watch) {
        watcher.on('update', function () {
            gutil.log('Bundling...');
            rebundle()
                .pipe(browserSync.stream({ once: true }));
        });
    }

    return rebundle();

    function rebundle() {
        return bundler.bundle()
            .on('error', function(err) { 
				gutil.log('Bundle error: ' + err.message + '\n' + err);  
                browserSync.notify('Browserify error!');
                this.emit('end'); 
            })
            .pipe(source(paths.scripts.bundleFilename))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.scripts.bundleDest));
    }
}

function watch() {
    return compile(true);
};


/*** TASKS ***/

// Clean built distribution files == delete dist directory
gulp.task('clean', function() {
    del(paths.clean);
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

// Build for distrution
gulp.task('build', ['styles', 'html'], function () { 
    return compile(); 
});

// Watch sources for development
gulp.task('watch', ['styles', 'html'], function () {  
    gulp.watch(paths.html.src, ['html']);
    gulp.watch(paths.styles.src, ['styles']);
    return watch(); 
});

// BrowserSync task 
gulp.task('browserSync', ['watch'], function () {
    gutil.log('Starting BrowserSync...');
    browserSync.init({
        files: [paths.html.distGlob, paths.styles.distGlob],
        server: { 
            baseDir: './dist'
        },
        open: false
    });
});

// Bundle, transform and move files for distribution, then serve from the ./dist directory
 
gulp.task('default', ['browserSync']);