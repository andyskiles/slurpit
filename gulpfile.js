var gulp = require('gulp'),

    // live reload and sync across browsers
    browserSync = require('browser-sync'),
    reload = browserSync.reload,

    // rename files
    rename = require('gulp-rename'),

    // notifications
    notify = require('gulp-notify'),
    
    // scss compiler
    sass = require('gulp-ruby-sass'),

    // autoprefix css
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),

    // js plugins
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');




// Run browser sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            // your project's build folder
            baseDir: "build/"
        }
    })
});

 



// Compile SASS
gulp.task('styles', function() {
  return sass('development/scss/main.scss', {
    // we use susy, feel free to remove this
    require: "susy",
    style: "expanded"
  })
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(gulp.dest('build/css'))
    .pipe(reload({stream:true}));
});




// Scripts
gulp.task('scripts', function() {
  return gulp.src('development/js/main.js')
    .pipe(concat('main.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('build/js/'))
    .pipe(reload({stream:true}));
});


// Scripts
gulp.task('minscripts', function() {
  return gulp.src('development/js/*.js')
    .pipe(concat('main.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build/js/'));
});
 
 



// Watch for changes
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch('development/scss/**/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('development/js/main.js', ['scripts']);

    // Watch .html files or .md files
    gulp.watch('build/*.html', [browserSync.reload]);
})
 
 


// Run gulp in terminal to start all of the following processes
gulp.task('default', ['styles', 'scripts', 'minscripts', 'browser-sync', 'watch']);






