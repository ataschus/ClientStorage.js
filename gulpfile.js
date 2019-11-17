const { src, dest, series } = require('gulp');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const typescript = require('gulp-typescript');

function transpile() {
    return src([
        'src/**/*.ts'
    ])
        .pipe(typescript({
            module: 'es2015',
            target: 'es5',
            moduleResolution: 'classic'
        }))
        .pipe(dest('dist/src'));
}

function remove_im_and_exports() {
    return src([
        'dist/src/**/*.js'
    ])
        .pipe(replace(/(im|ex)port.*;/g, ''))
        .pipe(dest('dist/src'));
}

function concatenate() {
    return src([
        'dist/src/**/*.js'
    ])
        .pipe(concat('ClientStorage.js'))
        .pipe(dest('dist'));
}

function minify() {
    return src([
        'dist/ClientStorage.js'
    ])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist'));
}


exports.transpile = transpile;
exports.remove_im_and_exports = remove_im_and_exports;
exports.concatenate = concatenate;
exports.minify = minify;
exports.default = series(transpile, remove_im_and_exports, concatenate, minify);
