const sharp = require('sharp');
const exif = require('exif');
const fs = require('fs');
const moment = require('moment');

function fileCreateTimestamp(filePath) {
  const fstat = fs.statSync(filePath);
  return moment(fstat.birthtime).format("YYYY:MM:DD HH:mm:ss");
}

function createTimestamp(exif) {
  return (exif.CreateDate != null ? exif.CreateDate : exif.DateTimeOriginal);
}

function isValidTimestamp(ts) {
  return (ts != null &&
    ts.length > 18 && // format: "YYYY:MM:DD HH:mm:ss"
    ts.substring(0, 4) != '0000');
}

function metadata(filePath) {
  return new Promise(function (resolve, reject) {
    exif({ image: filePath }, function (err, data) {
      if (err !== null) {
        if (err.code == "NO_EXIF_SEGMENT") {
          resolve({ createTimestamp: fileCreateTimestamp(filePath) });
        } else {
          reject(err);
        }
      }
      else {
        var ts = createTimestamp(data.exif);
        if (!isValidTimestamp(ts)) {
          ts = fileCreateTimestamp(filePath);
        }
        resolve({ createTimestamp: ts });
      }
    });
  });
}

exports.default = metadata;