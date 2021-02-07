const express = require('express');
const router = express.Router();
const album = require('../../album');

/** fetch all albums with photo names */
function fetchAll() {
  return album.list().map(albumEntry);
}

function albumEntry(albumName) {
  return {
    albumName,
    photoNames: album.listPhotoNames(albumName)
  };
}

router.get('/', function(req, res, next) {
  res.json({ 
      albums: fetchAll()
    });
});

module.exports = router;