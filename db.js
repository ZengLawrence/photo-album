const config = require('./config');
const fs = require('fs');

const rootDbFolder = config.rootFolder + '/.photo_album/db';
if (!fs.existsSync(rootDbFolder)) {
  fs.mkdirSync(rootDbFolder, { recursive: true });
}

var Datastore = require('nedb')
var db = {};
db.photos = new Datastore({ filename: rootDbFolder + '/photos.dat', autoload: true});
db.photos.ensureIndex({ fieldName: 'albumName' });
db.photos.ensureIndex({ fieldName: 'photoName' });
db.photos.ensureIndex({ fieldName: 'createTimestamp' });

exports.photos = db.photos;