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
  const yearLinksMap = metadatas.reduce(groupByYear, {});
  var yearLinks = [];
  for (const [year, thumbnailLinks] of Object.entries(yearLinksMap)) {
    yearLinks.push({ year, thumbnailLinks });
  }
  yearLinks.reverse();
  return yearLinks;
}

function groupByYear(map, { createTimestamp, albumName, photoName }) {
  const year = createTimestamp.substring(0, 4);
  var links = map[year];
  const thumbnailLink = '/thumbnails/' + albumName + '/' + photoName;
  if (links) {
    links.push(thumbnailLink);
  } else {
    links = [thumbnailLink];
  }
  map[year] = links;
  return map;
}

module.exports = router;
