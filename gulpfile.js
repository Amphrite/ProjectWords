//Gulp standalone
var gulp         = require('gulp');
//Plugins 
var uglify       = require('gulp-uglify'); 
var browserSync  = require('browser-sync'); 
var reload       = browserSync.reload;  
var sass         = require('gulp-sass'); 
var autoprefixer = require('gulp-autoprefixer'); 
var plumber      = require('gulp-plumber'); 
var del          = require('del'); 
var rename       = require('gulp-rename'); 

//Javascript task - Plumber, .min, uglify 
gulp.task('scripts', function(){
  gulp.src(['public/js/**/*.js', '!public/js/**/*.min.js'])
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
      .pipe(reload({stream:true}));
});

//Compass og SASS task - Plumber, Compass, require SUSY og Breakpoint, Browsersync 
gulp.task('styles', function(){
  gulp.src('public/scss/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('public/css'))
  .pipe(reload({stream:true})); 
});

//HTML Task - Browsersync 
gulp.task('html', function(){
  gulp.src('public/**/*.html')
  .pipe(reload({stream:true})); 
}); 

//Build Task - Bygger en "build-mappe" hvor filerne er klar til deployment

//Task som fjerner alle filer og mapper fra build-mappen
gulp.task('build:cleanfolder', function (cb) {
  del([
    'build/**'
    ], cb); 
}); 

//Task som laver build-mappen 
gulp.task('build:copy', ['build:cleanfolder'], function() {
  return gulp.src('public/**/*')
  .pipe(gulp.dest('build/')); 
}); 

//Task som fjerner ønskede filer til build-mappen
// - Indtast filer som du ikke ønsker med i build-mappen
gulp.task('build:remove', ['build:copy'], function (cb) {
  del([
    'build/scss/',
    'build/js/!(*.min.js)'
    ], cb); 
}); 

gulp.task('build', ['build:copy', 'build:remove']); 

//Browser-Sync Task
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./public"
    }
  });
});

//Task som kører "build-mappen" på en server, bruges til test
gulp.task('build:serve', function() {
  browserSync({
    server: {
      baseDir: "./build/"
    }
  });
}); 

//Watch task - Holder øje med ændringer i de angivede filer - outputter det i commandwindow
gulp.task('watch', function(){
  gulp.watch('public/js/**/*.js', ['scripts']); 
  gulp.watch('public/scss/**/*.scss', ['styles']); 
  gulp.watch('public/**/*.html', ['html']); 

}); 

//Gulp task - Indtast "gulp" i commandwindow(roden af mappen) - kører overstående scripts, pånær build
gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']); 
