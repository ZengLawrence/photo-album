const jsonfile = require('jsonfile')
const file = './photo_album.config.json'
 
const config = jsonfile.readFileSync(file);

exports.rootFolder = config.rootFolder;
