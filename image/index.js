/* wrapper over sharp library */
const sharp = require('sharp');
const metadata = require('./metadata');

function resize({ filePath, width, height }) {
  return sharp(filePath)
    .resize({
      width: width,
      height: height,
      fit: sharp.fit.contain,
      background:  {r:255,g:255,b:255,alpha:1}
    })
    .withMetadata()
    .toBuffer();
}

exports.resize = resize;
exports.metadata = metadata;  