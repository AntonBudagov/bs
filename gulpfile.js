'use strict';

const gulp = require('gulp');
const path = require('path');
const jade = require('gulp-jade');
const affected = require('gulp-jade-find-affected');
const sass = require('gulp-sass');
const stylus = require('gulp-stylus');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const resolver = require('stylus').resolver;
const revReplace = require('gulp-rev-replace');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const remember = require('gulp-remember');
const gulpIf =  require('gulp-if');
const svgSprite = require("gulp-svg-sprite");
const spritesmith = require('gulp.spritesmith');
const imageop = require('gulp-image-optimization');
const imageminMozjpeg = require('imagemin-mozjpeg');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const del =  require('del');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const mainBowerFiles = require('gulp-main-bower-files');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const _pathToSrc = '../app/';
/*
********************************************************************************
  Styles sass
********************************************************************************
*/
// gulp.task('styles', function () {

//  return gulp.src('app/styles/main.{sass,scss}') //{base:'app'}, {since: gulp.lastRun('styles')})
//     .pipe(gulpIf(isDevelopment, sourcemaps.init()))
//     .pipe(sass({
//       define:{ url:resolver()},
//     }).on('error', notify.onError()))
//     .pipe(autoprefixer('last 2 version', '> 1%', 'IE 9'))
//     .pipe(remember('styles'))
//     .pipe(debug({title: 'styles'}))
//     .pipe(gulpIf(isDevelopment, sourcemaps.write()))

//     .pipe(gulpIf(!isDevelopment, cssnano()))
//     .pipe(gulpIf(!isDevelopment, rev()))
//     .pipe(gulp.dest('dist/styles'))
//     .pipe(gulpIf(!isDevelopment, rev.manifest('css.json')))
//     .pipe(gulpIf(!isDevelopment, gulp.dest('manifest')));
// });


/*
********************************************************************************
  Styles stylus
********************************************************************************
*/
gulp.task('styles', function () {

 return gulp.src('app/styles/*.styl') //{base:'app'}, {since: gulp.lastRun('styles')}),
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(stylus({
      // paths: [_pathToSrc],
      import: [process.cwd() +'/app/styles/includes/mixins.styl', process.cwd() +'/app/styles/includes/palette.styl', process.cwd() +'/app/assets/**/*.styl'],
      // 'include css': true,
      //import: process.cwd() + '/tmp/styles/_sprite',
      define:{url:resolver()}
    }))
    .pipe(autoprefixer('last 2 version', '> 1%', 'IE 9'))
    // .pipe(remember('styles'))
    .pipe(debug({title: 'styles'}))
    // .pipe(concatCss('all.css'))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulpIf(!isDevelopment, cssnano()))
    .pipe(gulpIf(!isDevelopment, rev()))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulpIf(!isDevelopment, rev.manifest('css.json')))
    .pipe(gulpIf(!isDevelopment, gulp.dest('manifest')));
    // .on('error', notify.onError());
});
/*
********************************************************************************
  Concat all js file
********************************************************************************
*/
gulp.task('javascript', function () {

  const options = {
    mangle: false,
    compress: false,
    preserveComments: false,
    output: { beautify: isDevelopment}
  }

  return gulp.src('app/js/*.js')
    .pipe(uglify(options)).on('error', notify.onError())
    .pipe(gulpIf(!isDevelopment, rev()))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulpIf(!isDevelopment, rev.manifest('js.json')))
    .pipe(gulpIf(!isDevelopment, gulp.dest('manifest')));
});

/*
********************************************************************************
  jade
********************************************************************************
*/
gulp.task('assets:jade', function() {
  return gulp.src(['app/layouts/index.jade', 'app/assets/*.jade']) //, {since: gulp.lastRun('assets:jade')})
  .pipe(jade({
    pretty: true
  }).on('error', notify.onError()))
    .pipe(gulpIf(!isDevelopment, revReplace({
      manifest: gulp.src('manifest/*.json', {allowEmpty: true})
    })))
  .pipe(gulp.dest('dist'));
});

/*
********************************************************************************
  clean
********************************************************************************
*/
gulp.task('clean', function () {
  //return del('dist');
  return del(['manifest', 'dist/styles', 'dist/*.html', 'dist/js', '!dist/img', '!dist/lib', '!dist/fonts', '!dist/favicon', '!dist/icon.html']);
})


/*
********************************************************************************
  compress images file
********************************************************************************
*/
gulp.task('img', function(cb) {
  return gulp.src('app/assets/img/*.{jpg,png}', {since: gulp.lastRun('img')})

  .pipe(imageop({
    plugins: [imageminMozjpeg()],
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  }))
  .pipe(remember('img'))
  .pipe(debug({title: 'img'}))
  .pipe(gulp.dest('dist/img')).on('end', cb).on('error', cb);
});
/*
********************************************************************************
  create svg file
********************************************************************************
*/
gulp.task('svg', function() {

// SVG Config-------------------------------------------------------------------
var config = {
  mode: {
    css: {
      dest: '.', // where
      bust: !isDevelopment,
      sprite: 'sprite.svg',
      layout: 'vertical',
      prefix: '.i-',
      dimensions: true,
      render: {
        scss: {
          dest: '_sprite.scss'
        }
      }
    }
  }
};
  return gulp.src(['app/assets/img/icons/*.svg'])
    .pipe(svgSprite(config)).on('error', function(error){ console.log(error); })
    .pipe(debug({title: 'svg'}))
    // .pipe(gulpIf('*{.scss,styl}', gulp.dest('tmp/styles'), gulp.dest('dist/styles')));
    .pipe(gulpIf('*.scss', gulp.dest('app/styles'), gulp.dest('dist/styles')));
});

/*
********************************************************************************
  create png sprite
********************************************************************************
*/
gulp.task('png', function() {
  return  gulp.src('app/assets/img/icons/*.png') // путь, откуда берем картинки для спрайта
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssFormat: 'sass',
        imgPath: '../styles/sprite.png',
        cssName: '_spritePng.sass',
        algorithm: 'binary-tree',
        cssVarMap: function(sprite) {
            sprite.name = '' + sprite.name
        }
      }

    ))
    .pipe(debug({title: 'png'}))
    .pipe(gulpIf('*.sass', gulp.dest('app/styles'), gulp.dest('dist/styles')));
});
/*
********************************************************************************
  copy bower file
********************************************************************************
*/
gulp.task('bower', function() {
  return gulp.src('./bower.json').pipe(mainBowerFiles({
    overrides: {
      almond: {
        "ignore": true
      },
      jquery: {
        main: ["./dist/jquery.min.js"]
      },
      "materialize": {
        main: ["./js/modal.js","./js/waves.js", "./**/velocity.min.js"]
      },
      "owl.carousel":{
        main: ["./dist/*.min.js", "./dist/assets/*.min.css", "./dist/assets/*.gif"]
      },
      "jquery.maskedinput":{
        main: ["./dist/*.min.js"]
      }
    }
  })).pipe(gulp.dest('dist/lib'));
});
/*

/*
********************************************************************************
 watch
********************************************************************************
*/
gulp.task('watch', function () {

  gulp.watch(['app/styles/**/*.*', 'tmp/styles/_sprite.styl'], gulp.series('styles')).on('unlink', function(filepath){
    remember.forget('styles', path.resolve(filepath));
  });
  // gulp.watch('app/assets/**/*.*', gulp.series('assets'));
  gulp.watch(['app/assets/**/**/*.jade' ,'app/layouts/index.jade'], gulp.series('assets:jade'));

  gulp.watch('app/assets/img/*.{jpg,png}', gulp.series('img'));
  //gulp.watch('app/assets/img/*.{jpg,png,svg}', gulp.series('styles:assets'));

  gulp.watch('app/assets/img/icons/*.{svg}', gulp.series('svg'));
  gulp.watch('app/assets/img/icons/*.{png}', gulp.series('png'));

  gulp.watch('app/js/*.js', gulp.series('javascript'));

});

/*
********************************************************************************
  server
********************************************************************************
*/
gulp.task('serve', function() {
  browserSync.init({
    server: "dist"
  });
  browserSync.watch('dist').on('change', browserSync.reload);
});

/*
********************************************************************************
 build
********************************************************************************
*/
gulp.task('build', gulp.series(
    'clean',
    'svg',
    'png',
  gulp.parallel('styles', 'javascript' ), 'assets:jade', 'img'),
  'watch'
);
/*
********************************************************************************
 build
********************************************************************************
*/
gulp.task('build:dev', gulp.series(
    'clean',
    'svg',
    'png',
  gulp.parallel('styles', 'javascript', 'assets:jade'))
);
/*
********************************************************************************
 run
********************************************************************************
*/
gulp.task('dev', gulp.series('build:dev',
  gulp.parallel('watch','serve'))
);
