const { src, dest, series } = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpReplace = require('gulp-replace');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const gulpTypescript = require('gulp-typescript');

function transpile() {
    return src([
        'src/**/*.ts'
    ])
        .pipe(gulpTypescript({
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
        .pipe(gulpReplace(/(im|ex)port.*;/g, ''))
        .pipe(dest('dist/src'));
}

function concatenate() {
    return src([
        'dist/src/**/*.js'
    ])
        .pipe(gulpConcat('ClientStorage.js'))
        .pipe(dest('dist'));
}

function minify() {
    return src([
        'dist/ClientStorage.js'
    ])
        .pipe(gulpUglify())
        .pipe(gulpRename({ suffix: '.min' }))
        .pipe(dest('dist'));
}

exports.transpile = transpile;
exports.remove_im_and_exports = remove_im_and_exports;
exports.concatenate = concatenate;
exports.minify = minify;
exports.default = series(transpile, remove_im_and_exports, concatenate, minify);
