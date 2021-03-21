const exif = require('exif');
const util = require('util');
const fs = require('fs');
const moment = require('moment');

async function fileCreateTimestamp(filePath) {
  const stat = util.promisify(fs.stat);
  const data = await stat(filePath);
  return moment(data.birthtime).format("YYYY-MM-DD HH:mm:ss");
}

function createTimestamp(exif) {
  return (exif.CreateDate != null ? exif.CreateDate : exif.DateTimeOriginal);
}

// convert date part to ISO format i.e. replace ':' with '-'
function isoDate(timestamp) {
  return isValidTimestamp(timestamp) ? replaceColon(timestamp) : timestamp;
}

function replaceColon(timestamp) {
  const [date, time] = timestamp.split(" ", 2);
  return date.replaceAll(":", "-") + " " + time;
}

function isValidTimestamp(ts) {
  return (ts != null &&
    ts.length > 18 && // format: "YYYY:MM:DD HH:mm:ss"
    ts.substring(0, 4) != '0000');
}

async function metadata(filePath) {
  const exifMetadata = util.promisify(exif);
  try {
    const data = await exifMetadata(filePath);
    const ts = isoDate(createTimestamp(data.exif));
    if (!isValidTimestamp(ts)) {
      return fileCreateTimestamp(filePath);
    }
    return ts;
  } catch (err) {
    if (err.code == "NO_EXIF_SEGMENT") {
      return fileCreateTimestamp(filePath);
    } else {
      throw (err);
    }
  }
}

exports.default = metadata;