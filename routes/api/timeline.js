var express = require('express');
var router = express.Router();
var chrono = require('../../chrono');

/* GET list all years */
router.get('/', function (req, res, next) {
  chrono.allMetadatas().then(metadatas => {
    res.json({
      years: yearsView(metadatas),
    });
  });

});

function yearsView(metadatas) {
  const yearPhotosMap = metadatas.reduce(groupByYear, {});
  var photosByYear = [];
  for (const [year, photos] of Object.entries(yearPhotosMap)) {
    photosByYear.push({ year, photos });
  }
  return photosByYear;
}

function groupByYear(map, { createTimestamp, albumName, photoName, description }) {
  const year = createTimestamp.substring(0, 4);
  var photosByYear = map[year];
  if (photosByYear) {
    photosByYear.push({albumName, name: photoName, description, createTimestamp});
  } else {
    photosByYear = [{albumName, name: photoName, description, createTimestamp}];
  }
  map[year] = photosByYear;
  return map;
}

module.exports = router;
