/* List photo in reserse chronological order */
const album = require('./album');

function years() {
  return album.list().flatMap(albumPhoto).reduce(groupByYear, {});
}

function albumPhoto(albumName) {
  return album.listPhotoNames(albumName).map(photoName => {
    return {
      year: 2019,
      thumbnailLink: albumName + '/' + photoName
    }
  });
}

function groupByYear(map, {year, thumbnailLink}) {
  var links = map[year];
  if (links) {
    links.push(thumbnailLink);
  } else {
    links = [thumbnailLink];
  }
  map[year] = links;
  return map;
}

exports.years = years