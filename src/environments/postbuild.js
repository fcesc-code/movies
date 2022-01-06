"use strict";

const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");

const files = getFilesFromPath("./dist/movies", ".css");
let data = [];

console.warn(
  "be careful, this might dangerously delete some angular material css, this is a feature under development"
);

if (!files && files.length <= 0) {
  console.warn("cannot find style files to purge");
  process.exit(1);
}

for (let f of files) {
  const originalSize = getFilesizeInKiloBytes("./dist/movies/" + f) + "kb";
  var o = { file: f, originalSize: originalSize, newSize: "" };
  data.push(o);
}

console.log("Run PurgeCSS...");

exec(
  "purgecss -css dist/movies/*.css --content dist/movies/index.html dist/movies/*.js -o dist/movies/",
  function (error, stdout, stderr) {
    console.log("PurgeCSS done");
    console.log();

    for (let d of data) {
      const newSize = getFilesizeInKiloBytes("./dist/movies/" + d.file) + "kb";
      d.newSize = newSize;
    }

    console.table(data);
  }
);

function getFilesizeInKiloBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size / 1024;
  return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
  let files = fs.readdirSync(dir);
  return files.filter((e) => path.extname(e).toLowerCase() === extension);
}
