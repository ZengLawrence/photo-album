var express = require('express');
var router = express.Router();
var album = require('../album');

const THUMBNAIL_SIZE = {
  width: 50, height: 50
}

/* GET list all albums */
router.get('/', function(req, res, next) {
  res.render('albums', { 
      title: 'Photo Album',
      albums: album.list().map(albumEntry),
      thumbnailSize: THUMBNAIL_SIZE
    });
});

function albumEntry(albumName) {
  return {
    name: albumName
  };
}

/* GET one album */
router.get('/:albumName', function(req, res, next) {
  const albumName = req.params['albumName'];
  res.render('album', { 
    title: albumName,
    albumName,
    photos: photoEntries(albumName)
    });
});

function photoEntries(albumName) {
  return album.listPhotoNames(albumName).map(photoName => photoEntry(albumName, photoName));
}

function photoEntry(albumName, photoName) {
  return {
    name: photoName, 
    link: '/albums/' + albumName + '/' + photoName
  };
}

/* GET one photo */
router.get('/:albumName/:photoName', function(req, res, next) {
  const albumName = req.params['albumName'];
  const photoName = req.params['photoName'];
  const fileName = album.getPhotoFileName(albumName, photoName);
  res.sendFile(fileName);
});

module.exports = router;
