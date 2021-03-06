const express = require('express');
const router = express.Router();
const album = require('../../album');

/** fetch all albums with photo names */
function fetchAll(skip, pageSize) {
  if (pageSize) {
    return album.list().slice(skip * pageSize, (skip + 1) * pageSize).map(albumEntry);
  } else {
    return album.list().map(albumEntry);
  }
}

async function albumEntry(albumName) {
  const photos = await album.fetchPhotoMetadata(albumName);
  return {
    albumName,
    photos
  };  
}

router.get('/', function(req, res, next) {
  album.fetchAllAlbums()
    .then(albums => {
      res.json({ 
        albums
        });
    });
});

router.get('/:albumName', function(req, res, next) {
  const albumName = req.params['albumName'];
  album.fetchPhotoMetadata(albumName)
    .then(photos => {
      res.json({ 
        photos
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