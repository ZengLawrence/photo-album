/* wrapper over sharp library */
const sharp = require('sharp');

function resize({filePath, width, height}) {
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
  
exports.resize = resize;  