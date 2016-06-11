var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
//var reactify = require('reactify');
//var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
//var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var babelify = require('babelify');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
//var shell = require('gulp-shell');
//var glob = require('glob');
var sourcemaps = require('gulp-sourcemaps')
var buffer = require('vinyl-buffer')
var merge = require('utils-merge')
var rename = require('gulp-rename')
var chalk = require('chalk')
var DIST_DIR = './www'
var SRC_DIR = './src/appReact'
var vendor_libs = [
    'react',
    'react-dom',
    'flux',
    'backbone',
    'react-modal',
];

var isProduction = gutil.env.min?true:false;
var vendor_js = function () {
    var b = browserify({ debug: true });
    vendor_libs.forEach(function (lib) {
        b.require(lib);
    });
    if(isProduction){
    b.plugin('minifyify', {
        map: 'vendor.map',
        uglify: {
            mangle: true,
            compress: {
                drop_debugger: true,
                drop_console: true,
            }
        },
        output: DIST_DIR + '/build/vendor.min.map'
    })

    }
    b.bundle()
        .pipe(source('vendor.min.js'))
        .pipe(gulp.dest(DIST_DIR + "/build"));
};
var app_js = function (options) {
    var b = browserify({
        extensions: ['.js', '.jsx'],
        debug: true,
    });
    vendor_libs.forEach(function (lib) {
        b.external(lib);
    });
    var rebundle = function () {
        b.transform(babelify.configure({
  presets: ["es2015", "react"]
})
                   );

    if(isProduction){
        b.plugin('minifyify', {
        map: 'main.map',
        uglify: {
        mangle: true,
        compress: {
        drop_debugger: true,
        drop_console: true,
        }
        },
        output: DIST_DIR + '/build/main.min.map'
        })
    };
            b.external(vendor_libs)
            .add(SRC_DIR + "/appBase.js")
            .bundle()
            .on("error", function (err) { map_error(err) })
            .pipe(source('main.min.js'))
            .pipe(gulp.dest(DIST_DIR + "/build"));
    }
    //b = watchify(b);
    //b.on('update', rebundle);
    rebundle();
};
function map_error(err) {
    if (err.fileName) {
        // regular error
        gutil.log(chalk.red(err.name)
                  + ': '
                  + chalk.yellow(err.fileName.replace(__dirname + '/appReact/', ''))
                  + ': '
                  + 'Line '
                  + chalk.magenta(err.lineNumber)
                  + ' & '
                  + 'Column '
                  + chalk.magenta(err.columnNumber || err.column)
                  + ': '
                  + chalk.blue(err.description))
    } else {
        // browserify error..
        gutil.log(chalk.red(err.name)
                  + ': '
                  + chalk.yellow(err.message))
    }
}
var cssTask = function (options) {
    if (!options.development) {
        var run = function () {
            console.log(arguments);
            var start = new Date();
            console.log('Building CSS bundle');
            gulp.src(options.src)
                .pipe(concat('main.css'))
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src(options.src)
            .pipe(concat('main.css'))
            .pipe(cssmin())
            .pipe(gulp.dest(options.dest));
    }
};
gulp.task('css', function () {
    cssTask({
        development: isProduction,
        src: './src/assets/css/*.css',
        dest: './www/build'
    });
});
gulp.task('main', function () {
    app_js();
})
gulp.task('all', function () {
    app_js();
    vendor_js()
})
gulp.task('watch', function () {
    gulp.watch(
        [SRC_DIR + "/*.js", SRC_DIR + "/**/*.js", SRC_DIR + "/**/**/*.js", ],
        ['app_js']
    );
});
