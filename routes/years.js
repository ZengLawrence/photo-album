var express = require('express');
var router = express.Router();
var chrono = require('../chrono');

/* GET list all years */
router.get('/', function (req, res, next) {
  res.render('years', {years: yearsView()});
});

function yearsView() {
  var yearLinks = [];
  for (const [year, thumbnailLinks] of Object.entries(chrono.years())) {
    yearLinks.push({year, thumbnailLinks});
  }
  return yearLinks;
}

module.exports = router;
