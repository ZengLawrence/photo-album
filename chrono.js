/* List photo in reserse chronological order */
const album = require('./album');
const image = require('./image');
const db = require('./db');

function albumPhotoMetadatas() {
   return new Promise((resolve, reject) => {
      db.photos.find({}).sort({createTimestamp: -1}).exec( (err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
   });
}

exports.albumPhotoMetadatas = albumPhotoMetadatas