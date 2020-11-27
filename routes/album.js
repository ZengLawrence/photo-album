var express = require('express');
var router = express.Router();
var album = require('../album');

/* GET list all albums */
router.get('/', function(req, res, next) {
  res.render('albums', { 
      title: 'Photo Album',
      albums: album.list().map(albumEntry),
      thumbnailSize: {width: 100, height: 100}
    });
});

function albumEntry(albumName) {
  return {
    name: albumName, 
    link: '/albums/' + albumName,
    thumbnailLink: thumbnailLink(albumName)
  };
}

function thumbnailLink(albumName) {
  return photoEntries(albumName).shift().link;
}

/* GET one album */
router.get('/:albumName', function(req, res, next) {
  const albumName = req.params['albumName'];
  res.render('album', { 
    title: albumName,
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
