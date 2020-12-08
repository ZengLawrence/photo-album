/* List photo in reserse chronological order */
const album = require('./album');
const image = require('./image');
const db = require('./db');

const NUMB_PHOTO_PER_PAGE = 10;

function albumPhotoMetadatas(skipPage = 0) {
  return new Promise((resolve, reject) => {
    db.photos
      .find({})
      .sort({ createTimestamp: 1 })
      .skip(NUMB_PHOTO_PER_PAGE * skipPage)
      .limit(NUMB_PHOTO_PER_PAGE)
      .exec((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
}

exports.albumPhotoMetadatas = albumPhotoMetadatas