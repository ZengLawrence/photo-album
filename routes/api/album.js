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

router.put('/:albumName/photos/:photoName/description', function(req, res, next) {
  const albumName = req.params['albumName'];
  const photoName = req.params['photoName'];
  const description = req.body.data;
  album.savePhotoDescription({albumName, photoName}, description)
    .then(() => res.status(200).send())
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });
});

module.exports = router;