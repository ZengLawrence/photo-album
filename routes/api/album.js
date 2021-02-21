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
  return album.fetchPhotoMetadata(albumName)
    .then(photos => {
      return {
        albumName,
        photos
      };  
    });  
}

router.get('/', function(req, res, next) {
  const limit = req.query.limit;
  Promise.all(fetchAll(limit))
    .then(albums => {
      res.json({ 
        albums
        });
    
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