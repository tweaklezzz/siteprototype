const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefix = require('gulp-autoprefixer')
const uglifyjs = require('gulp-uglify');

function buildCss() {
  return src('./src/**/main.scss')
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(cssnano())
    .pipe(dest('./build/'))
}

function copyAssets() {
  return src('./src/assets/**/*')
  .pipe(dest('./build/assets'))
}

function copyHtml() {
  return src('./src/**/*.html')
  .pipe(dest('./build'))
}

function copyJs() {
  return src('./src/script/**/*.js')
  .pipe(uglifyjs())
  .pipe(dest('./build/script/'))
}

function dev() {
  watch("./src/**/*", series(buildCss, copyAssets, copyJs, copyHtml))
}

module.exports.build = series(buildCss, copyAssets, copyJs, copyHtml)
module.exports.dev = dev
