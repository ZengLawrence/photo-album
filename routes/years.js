var express = require('express');
var router = express.Router();
var chrono = require('../chrono');

/* GET list all years */
router.get('/', function (req, res, next) {
    chrono.albumPhotoMetadatas().then( metadatas => {
        res.render('years', {years: yearsView(metadatas)});
    });
  
});

function yearsView(metadatas) {
    const yearLinksMap = metadatas.reduce(groupByYear, {});
    var yearLinks = [];
    for (const [year, thumbnailLinks] of Object.entries(yearLinksMap)) {
        yearLinks.push({year, thumbnailLinks});
    }
    return yearLinks;
}  

function groupByYear(map, {createTimestamp, albumName, photoName}) {
    const year = createTimestamp.substring(0, 4);
    var links = map[year];
    const thumbnailLink = albumName + '/' + photoName;
    if (links) {
      links.push(thumbnailLink);
    } else {
      links = [thumbnailLink];
    }
    map[year] = links;
    return map;
  }
  
module.exports = router;
