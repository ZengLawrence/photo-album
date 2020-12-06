/* wrapper over sharp library */
const sharp = require('sharp');
const exif = require('exif');
const fs = require('fs');
const moment = require('moment');

function resize({ filePath, width, height }) {
  return sharp(filePath)
    .resize({
      width: width,
      height: height,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy
    })
    .withMetadata()
    .toBuffer();
}

function metadata(filePath) {
  return new Promise(function (resolve, reject) {
    exif({ image: filePath }, function (err, data) {
      if (err !== null) {
        reject(err);
      }
      else {
        var ts = createTimestamp(data.exif);
        if (!isValidTimestamp(ts)) {
          const fstat = fs.statSync(filePath);
          ts = moment(fstat.birthtime).format("YYYY:MM:DD HH:mm:ss");
        }
        resolve({ createTimestamp: ts });
      }
    });
  });
}

function createTimestamp(exif) {
  return (exif.CreateDate != null ? exif.CreateDate : exif.DateTimeOriginal);
}

function isValidTimestamp(ts) {
  return (ts!=null && 
    ts.length > 18 && // format: "YYYY:MM:DD HH:mm:ss"
    ts.substring(0, 4) != '0000');
}

exports.resize = resize;
exports.metadata = metadata;  