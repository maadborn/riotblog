'use strict';

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var babelify    = require('babelify');
var watchify    = require('watchify');
var browserify  = require('browserify');
var browsersync = require('browser-sync');
var sourcemaps  = require('gulp-sourcemaps');
var riotify     = require('riotify');
var changed     = require('gulp-changed');
var del         = require('del');
var sass		= require('gulp-sass');
var merge 		= require('merge-stream');
var concat		= require('gulp-concat');
var autoprefix 	= require('gulp-autoprefixer');

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
        src: ['./src/styles/*.css'],
        dest: './dist/styles',
        distGlob: './dist/**/*.css',
		sassSrc: ['./src/styles/**/*.scss', './src/tags/**/*.scss'],
		mergedStyleFile: 'app.css'
    },
    html: {
        src: './src/*.html',
        dest: './dist',
        distGlob: './dist/**/*.html'
    },
    clean: './dist/**',
	browsersyncBaseDir: './dist'
};

var sassOptions = {};
var autoprefixerOptions = {};
var riotifyOptions = { 
	ext: 'tag.html', 
	type: 'babel' 
};

// Prepare scripts for package/distribution/browser
function compile(watch) {
    var bundler = browserify(paths.scripts.bundleEntry, { debug: true })
        .transform(babelify)
        .transform(riotify, riotifyOptions)
		;
	
    var watcher = watch ? watchify(bundler) : '';

    if (watch) {
        watcher.on('update', function () {
            gutil.log('Bundling...');
            rebundle()
                .pipe(browsersync.stream({ once: true }));
        });
    }

    return rebundle();

    function rebundle() {
        return bundler.bundle()
            .on('error', function(err) { 
				gutil.log('Bundle error: ', err);  
                browsersync.notify('Browserify error!');
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

/*
DEPRECATED, use 'styles' for a complete sass+css build
gulp.task('stylesOld', function() {
    return gulp.src(paths.styles.src)
        //concat, autoprefix, minify
        .pipe(gulp.dest(paths.styles.dest));
});
*/

gulp.task('styles', function() {
	var cssStream = gulp.src(paths.styles.src);
	
	var sassStream = gulp.src(paths.styles.sassSrc)
		.pipe(sass(sassOptions).on('error', sass.logError));
	
    return merge(cssStream, sassStream)
		.pipe(autoprefix(autoprefixerOptions))
		.pipe(concat(paths.styles.mergedStyleFile))
        .pipe(gulp.dest(paths.styles.dest))
		.pipe(browsersync.stream());
});

/*
DEPRECATED, use 'styles' for a complete sass+css build
gulp.task('sass', function() {
	return gulp.src(paths.styles.sassSrc)
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browsersync.stream());
});
*/

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
    var stylesSrc = paths.styles.src.concat(paths.styles.sassSrc);
	
	gulp.watch(stylesSrc, ['styles']);
    gulp.watch(paths.html.src, ['html']);
    
	return watch(); 
});

// browsersync task 
gulp.task('browsersync', ['watch'], function () {
    gutil.log('Starting browsersync...');
    
	browsersync.init({
        files: [paths.html.distGlob, paths.styles.distGlob],
        server: { 
            baseDir: paths.browsersyncBaseDir
        },
        open: false
    });
});

// Bundle, transform and move files for distribution, then serve from the ./dist directory
 
gulp.task('default', ['browsersync']);
