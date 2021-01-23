var express = require('express');
var router = express.Router();
var chrono = require('../chrono');

/* GET list all years */
router.get('/', function (req, res, next) {
  chrono.albumPhotoMetadatas().then(metadatas => {
    res.render('years', {
      years: yearsView(metadatas, { page: 0 }),
      nextPage: 2
    });
  });

});

router.get('/:page', function (req, res, next) {
  var page = parseInt(req.params['page'], 10);
  if (page == NaN) page = 0;

  chrono.albumPhotoMetadatas(page-1).then(metadatas => {
    res.render('years', {
      years: yearsView(metadatas, { page: page - 1 }),
      prevPage: page - 1,
      nextPage: page + 1
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

function groupByYear(map, { createTimestamp, albumName, photoName }) {
  const year = createTimestamp.substring(0, 4);
  var photosByYear = map[year];
  if (photosByYear) {
    photosByYear.push({albumName, photoName});
  } else {
    photosByYear = [{albumName, photoName}];
  }
  map[year] = photosByYear;
  return map;
}

module.exports = router;
