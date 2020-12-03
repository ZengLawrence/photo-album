/* List photo in reserse chronological order */
const album = require('./album');
const image = require('./image');

function albumPhotoMetadatas() {
  return Promise.all(album.list().flatMap(albumPhoto));
}

function albumPhoto(albumName) {
  return album.listPhotoNames(albumName)
    .map(photoName => {
      return {albumName, photoName}
    }).map(addCreateTimestamp);
}

async function addCreateTimestamp({albumName, photoName}) {
  const path = album.getPhotoFileName(albumName, photoName);
  const metadata = await image.metadata(path);
  return { albumName, photoName, createTimestamp: metadata.createTimestamp };
}

exports.albumPhotoMetadatas = albumPhotoMetadatas