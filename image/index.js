/* wrapper over sharp library */
const sharp = require('sharp');
const exif = require('exif');

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
  return new Promise(function(resolve, reject) {
    exif({image: filePath}, function(err, data) {
        if (err !== null) reject(err);
        else resolve({createTimestamp: data.exif.DateTimeOriginal});
    });
});
}

exports.resize = resize;
exports.metadata = metadata;  