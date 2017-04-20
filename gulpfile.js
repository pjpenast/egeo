var gulp = require('gulp');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');

gulp.task('copyHtml', () => {
   gulp.src('./src/**/*.html')
      .pipe(gulp.dest('./dist/src'));
});

gulp.task('copyTs', () => {
   gulp.src('./src/**/*.ts')
      .pipe(replace(/styleUrls: \[(\'\.\/|\')(.*?)\.scss\'\]/g, 'styleUrls: [\'$2.css\']'))
      .pipe(gulp.dest('./dist/src'));
});

gulp.task('copyCss', () => {
   gulp.src('./src/**/*.css')
      .pipe(postcss())
      .pipe(gulp.dest('./dist/src'));
});

gulp.task('copyScss', () => {
   gulp.src('./src/**/*.scss')
      .pipe(sass())
      .pipe(postcss())
      .pipe(gulp.dest('./dist/src'));
});

gulp.task('default', ['copyHtml', 'copyTs', 'copyCss', 'copyScss']);
