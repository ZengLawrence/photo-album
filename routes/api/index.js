var express = require('express');
var router = express.Router();
var album = require('../../album');

/* GET list all albums */
router.get('/albums', function(req, res, next) {
  res.json({ 
      albums: album.list().map(albumEntry)
    });
});

function albumEntry(albumName) {
  return {
    albumName,
    photoNames: album.listPhotoNames(albumName)
  };
}

module.exports = router;
