'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const webpack = require('webpack-stream')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const path = require('path')
const node_modules_dir = path.resolve(__dirname, '../node_modules')

module.exports = {

  defaultTaskName: 'default',

  tasks: {
    default: ['compileTemplate', 'compileStyles', 'image', 'bundle'],
    compileTemplate: () => {
      return gulp.src('./assets/js/**/*.js')
        .pipe(babel({
          presets: ['react', 'es2015', 'stage-0']
        }))
        .pipe(gulp.dest('dist'))
    },
    compileStyles: () => {
      return gulp.src('./assets/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
    },
    image: () => {
      return gulp.src('./assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
    },
    bundle: () => {
      return gulp.src('assets/js/client.js')
        .pipe(webpack({
          output: {
            filename: 'client.js'
          },
          module: {
            loaders: [{
              test: /\.js$/,
              exclude: [node_modules_dir], // we don't want to transpile node_modules
              loader: 'babel-loader',
              query: {
                presets: ['react', 'es2015', 'stage-0']
              }
            },
            {
              test: /\.(css|scss)$/,
              loaders: ['style', 'css', 'sass']
            }]
          }
        }))
        .pipe(gulp.dest('dist'))
    }
  }

}
