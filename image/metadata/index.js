const sharp = require('sharp');
const createTimestamp = require("./createTimestamp").default;

async function metadata(filePath) {
  const data = await sharp(filePath).metadata();
  const creTs = await createTimestamp(filePath);
  return {
    width: data.width,
    height: data.height,
    orientation: data.orientation,
    createTimestamp: creTs
  };
}

exports.default = metadata;