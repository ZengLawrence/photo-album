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
  const datePhotosMap = metadatas.reduce(groupByDate, {});
  const yearPhotosMap = Object.entries(datePhotosMap)
    .map(([date, photos]) => { return { date, photos }; })
    .reduce(groupByYear, {});
  return Object.entries(yearPhotosMap)
  .map(([year, photosByDate]) => { return { year, photosByDate }; })
}

function groupByDate(map, { createTimestamp, albumName, photoName }) {
  const date = createTimestamp.substring(0, 10);
  var photosByDate = map[date];
  if (photosByDate) {
    photosByDate.push({albumName, name: photoName});
  } else {
    photosByDate = [{albumName, name: photoName}];
  }
  map[date] = photosByDate;
  return map;
}

function groupByYear(map, { date, photos }) {
  const year = date.substring(0, 4);
  var photosByYear = map[year];
  if (photosByYear) {
    photosByYear.push({ date, photos });
  } else {
    photosByYear = [{ date, photos }];
  }
  map[year] = photosByYear;
  return map;
}

module.exports = router;
