const album = require('../../album');

/** fetch all albums with photo names */
function fetchAll() {
  return album.list().map(albumEntry);
}

function albumEntry(albumName) {
  return {
    albumName,
    photoNames: album.listPhotoNames(albumName)
  };
}

exports.fetchAll = fetchAll;