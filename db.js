var Datastore = require('nedb')
var db = {};
db.photos = new Datastore(); // in memory for now
db.photos.ensureIndex({ fieldName: 'albumName' });
db.photos.ensureIndex({ fieldName: 'photoName' });
db.photos.ensureIndex({ fieldName: 'createTimestamp' });

exports.photos = db.photos;