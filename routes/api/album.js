const express = require('express');
const router = express.Router();
const album = require('../../album');

/** fetch all albums with photo names */
function fetchAll(limit) {
  if (limit) {
    return album.list().slice(0, limit).map(albumEntry);
  } else {
    return album.list().map(albumEntry);
  }
}

function albumEntry(albumName) {
  return {
    albumName,
    photoNames: album.listPhotoNames(albumName)
  };
}

router.get('/', function(req, res, next) {
  const limit = req.query.limit;
  const albums = fetchAll(limit);
  res.json({ 
    albums
    });
});

module.exports = router;