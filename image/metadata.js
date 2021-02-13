const sharp = require('sharp');
const exif = require('exif');
const util = require('util');
const fs = require('fs');
const moment = require('moment');

async function fileCreateTimestamp(filePath) {
  const stat = util.promisify(fs.stat);
  const data = await stat(filePath);
  return moment(data.birthtime).format("YYYY:MM:DD HH:mm:ss");
}

function createTimestamp(exif) {
  return (exif.CreateDate != null ? exif.CreateDate : exif.DateTimeOriginal);
}

function isValidTimestamp(ts) {
  return (ts != null &&
    ts.length > 18 && // format: "YYYY:MM:DD HH:mm:ss"
    ts.substring(0, 4) != '0000');
}

async function metadata(filePath) {
  try {
    const data = await readMetadata(filePath);
    var ts = createTimestamp(data.exif);
    if (!isValidTimestamp(ts)) {
      return fileCreateTimestamp(filePath).then(createTimestamp => { return { createTimestamp }; });
    }
    return { createTimestamp: ts };
  } catch (err) {
    if (err.code == "NO_EXIF_SEGMENT") {
      return fileCreateTimestamp(filePath).then(createTimestamp => { return { createTimestamp }; });
    } else {
      throw (err);
    }
  }
}

function readMetadata(filePath) {
  return new Promise(function (resolve, reject) {
    exif({ image: filePath }, function (err, data) {
      if (err !== null) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
}

exports.default = metadata;