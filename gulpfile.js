var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

var PROJECT_ROOT = __dirname;
var PROJECT_PATH = {
    'scss': PROJECT_ROOT + '/private/scss/',
    'css': PROJECT_ROOT + '/app/',
};
var PROJECT_PATTERNS = {
    'scss': [
        PROJECT_PATH.scss + '**/*.scss'
    ]
};

gulp.task('scss', function () {
    return gulp.src(PROJECT_PATTERNS.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(PROJECT_PATH.css))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: 'app',
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    }, function (err, bs) {
        console.log(bs.options.getIn(['urls', 'local']));
    });

    gulp.run('watch');
    gulp.watch('private/*.scss', ['scss']);
    gulp.watch(['app/**/*.html', 'app/**/*.js']).on('change', browserSync.reload);
});

/**
 * Watch for changes in JavaScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(['app/**/*.html', 'app/**/*.js']).on('change', function (file) {
        console.log('Resource file ' + file.path + ' has been changed. Updating.');
    });
    gulp.watch(PROJECT_PATTERNS.scss, ['scss']).on('change', function (file) {
        console.log('Styles file ' + file.path + ' has been changed. Updating.');
    });
});