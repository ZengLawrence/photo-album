const _ = require('lodash');
var express = require('express');
var router = express.Router();
var chrono = require('../../chrono');

/* GET list all years */
router.get('/', function (req, res, next) {
  chrono.allMetadatas().then(metadatas => {
    res.json({
      years: _.map(_.groupBy(metadatas, groupByDate), photosByDate),
    });
  });

});

function groupByDate({ createTimestamp}) {
  return createTimestamp.substring(0, 10);
}

function photosByDate(metadatas, date) {
  return {
    date, 
    photos: _.map(metadatas, ({albumName, photoName}) => {
      return {
        albumName,
        name: photoName
      }
    })
  };
}

module.exports = router;
