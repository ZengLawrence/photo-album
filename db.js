var Datastore = require('nedb')
var db = {};
db.photos = new Datastore(); // in memory for now

exports.photos = db.photos;