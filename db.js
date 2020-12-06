const config = require('./config');
const fs = require('fs');

const rootDbFolder = config.rootFolder + '/.photo_album/db';
if (!fs.existsSync(rootDbFolder)) {
  fs.mkdirSync(rootDbFolder, { recursive: true });
}

var Datastore = require('nedb')
var db = {};
db.photos = new Datastore({ filename: rootDbFolder + '/photos.dat', autoload: true}); // in memory for now

exports.photos = db.photos;