/* List photo in reserse chronological order */
const album = require('./album');

function years() {
  return album.list().flatMap(albumPhoto);
}

function albumPhoto(albumName) {
  return album.listPhotoNames(albumName).map(photoName => {
    return {
      year: 2019,
      thumbnailLinks: [albumName + '/' + photoName]
    }
  });
}

exports.years = years