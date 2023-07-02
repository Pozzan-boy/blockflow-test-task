"use strict";

const gulp = require("gulp");
const browsersync = require("browser-sync");
const sass = require('gulp-sass')(require('sass'));

const dist = "./dist/";

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"))
                .on("end", browsersync.reload);
});

gulp.task("build-css", () => {
    return gulp.src("./src/sass/**/*.scss")
                .pipe(sass().on("error", sass.logError))
                .pipe(gulp.dest(dist + "/css/"))
                .on("end", browsersync.reload);
})

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/sass/**/*.scss", gulp.parallel("build-css"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-css"));

gulp.task("default", gulp.parallel("watch", "build"));