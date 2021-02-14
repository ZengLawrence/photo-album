/* wrapper over sharp library */
const sharp = require('sharp');
const metadata = require('./metadata').default;

const FitEnum = {
  contain: "contain",
  cover: "cover"
};

function resize({ filePath, width, height, fit = FitEnum.cover }) {
  return sharp(filePath)
    .resize({
      width,
      height,
      fit,
      background:  {r:255,g:255,b:255,alpha:1}
    })
    .withMetadata()
    .toBuffer();
}

exports.FitEnum = FitEnum;
exports.resize = resize;
exports.metadata = metadata;  