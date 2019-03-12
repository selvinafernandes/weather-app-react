const gulp = require("gulp");
const runSequence = require("run-sequence");
const requireDir = require("require-dir");

gulp.task("default", function() {
	runSequence(["sass", "watch"]);
});

requireDir("gulp/tasks");
