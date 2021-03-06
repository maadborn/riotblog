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
var nodemon		= require('nodemon');

// Paths object
var paths = {
    scripts: {
        bundleEntry: './src/client/scripts/boot.js',
        bundleDest: './dist/public/scripts',
        bundleFilename: 'bundle.js',
        sourceMapDest: './dist/scripts/bundle.js.map',
        sourceMapFilename: 'bundle.js.map',
    },
    styles: {
        src: ['./src/client/styles/*.css'],
        dest: './dist/public/styles',
        distGlob: './dist/**/*.css',
		sassSrc: ['./src/client/styles/**/*.scss', './src/client/tags/**/*.scss'],
		mergedStyleFile: 'app.css',
    },
    html: {
        src: './src/client/*.html',
        dest: './dist/public',
        distGlob: './dist/**/*.html',
    },
    clean: './dist/**',
	browsersyncBaseDir: './dist/public',
	server: {
		src: './src/server/**',
		dest: './dist',
		proxy: 'http://localhost:5000',
		entry: './dist/server.js',
		publicGlob: './dist/public/**/*.*',
		nodemonWatch: ['dist'],
		nodemonIgnore: ['dist/public'],
	},
	common: {
		src: './src/common/**',
		dest: './dist/common',		
	},
};

var sassOptions = {};
var autoprefixerOptions = {};
var riotifyOptions = { 
	ext: 'tag.html', 
	type: 'babel',
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

// Html move task
gulp.task('html', function() {
    return gulp.src(paths.html.src)
        // minify?
        .pipe(changed(paths.html.dest))
        .pipe(gulp.dest(paths.html.dest));
});

// Server move task
gulp.task('server', function() {
    return gulp.src(paths.server.src)
        .pipe(changed(paths.server.dest))
        .pipe(gulp.dest(paths.server.dest));
});

// Copmon move task
gulp.task('common', function() {
    return gulp.src(paths.common.src)
        .pipe(changed(paths.common.dest))
        .pipe(gulp.dest(paths.common.dest));
});

// Build for distrution
gulp.task('build', ['styles', 'html', 'server', 'common'], function () { 
    return compile(); 
});

// Watch sources for development
gulp.task('watch', ['styles', 'html', 'server', 'common'], function () {  
	gulp.watch([paths.styles.src, paths.styles.sassSrc], ['styles']);
    gulp.watch(paths.html.src, ['html']);
    gulp.watch(paths.server.src, ['server']);
    gulp.watch(paths.common.src, ['common']);
    
	return watch(); 
});

// Watch sources for development
// gulp.task('bswatch', ['styles', 'html', 'server', 'common'], function () {  
// 	gulp.watch([paths.styles.src, paths.styles.sassSrc], ['styles']);
//     gulp.watch(paths.html.src, ['html']);
//     gulp.watch(paths.server.src, ['server']);
//     gulp.watch(paths.common.src, ['common']);
    
//     var bs = browsersync;
    
//     bs.watch(paths.styles.sassSrc).on('change', bs.reload);
//     bs.watch(paths.styles.src).on('change', bs.reload);
//     bs.watch(paths.html.src).on('change', bs.reload);
//     bs.watch(paths.server.src).on('change', bs.reload);
//     bs.watch(paths.common.src).on('change', bs.reload);
    
// 	return watch(); 
// });

// browsersync task 
gulp.task('browsersyncOld', ['watch'], function () {
    gutil.log('Starting browsersync...');
    
	browsersync.init({
        files: [paths.html.distGlob, paths.styles.distGlob],
        server: { 
            baseDir: paths.browsersyncBaseDir
        },
        open: false,
    });
});

// Bundle, transform and move files for distribution, then serve from the ./dist directory
gulp.task('defaultOld', ['browsersyncOld']);

//// NEW ////

// nodemon task
gulp.task('nodemon', function (cb) {
	var started = false;
	
	return nodemon({
		script: paths.server.entry,
		watch: paths.server.dest,
		ignore: paths.server.nodemonIgnore,
	})
	.on('start', function () {
		gutil.log('Starting nodemon...');
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true; 
		} 
	})
	.on('restart', function () {
		gutil.log('Restarting nodemon...');
	});
});

// browsersync task 
gulp.task('browsersync', ['watch', 'nodemon'], function () {
    gutil.log('Starting browsersync...');
    
	browsersync.init(null, {
		proxy: paths.server.proxy,
        files: [paths.server.publicGlob],
        port: 7000,
        open: false,
	});
});

gulp.task('default', ['browsersync']);
