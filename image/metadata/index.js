const createTimestamp = require("./createTimestamp").default;

async function metadata(filePath) {
  const creTs = await createTimestamp(filePath);
  return {
    createTimestamp: creTs
  };
}

exports.default = metadata;