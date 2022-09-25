var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require("gulp-sass")(require("sass"));
// var minifyCss = require("gulp-minify-css");
const cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
// var connect = require("gulp-connect");
var autoprefixer = require("gulp-autoprefixer");

var paths = {
  sass: ["./styles/globals.scss"],
  componentSass: ["./**/*.scss"],
};

function sassStep(done) {
  gulp
    .src(paths.sass)
    .pipe(sass())
    .pipe(autoprefixer("last 2 version"))
    // .pipe(gulp.dest("./public/"))
    // .pipe(
    //   minifyCss({
    //     keepSpecialComments: 0,
    //   })
    // )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./public/"))
    .on("end", done);
}

function watch() {
  gulp.watch(paths.componentSass, gulp.series(sassStep));
}

gulp.task("default", gulp.series(watch));
