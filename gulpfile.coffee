gulp   = require 'gulp'
util   = require 'gulp-util'
concat = require 'gulp-concat'

smaps  = require 'gulp-sourcemaps'
coffee = require 'gulp-coffee'
sass   = require 'gulp-ruby-sass'
haml   = require 'gulp-ruby-haml'

# 防止编译 coffee 过程中 watch 进程中止
plumber = require("gulp-plumber")

app =
  src:
    js: 'src/js/**/*.coffee'
    game: 'src/game/*.coffee'
    css: 'src/css/*.scss'
    html: 'src/html/*.haml'
  dist:
    js: 'dist/js'
    game: '/dist/game'
    css: 'dist/css'
    html: '.'

gulp.task 'js', ->
  gulp.src app.src.js
    .pipe plumber()
    .pipe smaps.init()
    .pipe coffee()
    .pipe smaps.write('../maps')
    .pipe gulp.dest(app.dist.js)

gulp.task 'game', ->
  gulp.src app.src.game
    .pipe plumber()
    .pipe smaps.init()
    .pipe coffee()
    .pipe smaps.write('../maps')
    .pipe gulp.dest(app.dist.game)

gulp.task 'css', ->
  gulp.src app.src.css
    .pipe sass()
    .on 'error', (err)->
      file = err.message.match(/^error\s([\w\.]*)\s/)[1]
      util.log [
        err.plugin,
        util.colors.red file
        err.message
      ].join ' '
    .pipe concat('ui.css')
    .pipe gulp.dest(app.dist.css)

gulp.task 'html', ->
  gulp.src app.src.html
    .pipe haml()
    .pipe gulp.dest(app.dist.html)


gulp.task 'build', [
  'js'
  'css'
  'html'
]

gulp.task 'default', ['build']

gulp.task 'watch', ['build'], ->
  gulp.watch app.src.js, ['js']
  gulp.watch app.src.css, ['css']
  gulp.watch app.src.html, ['html']