var express = require('express');
var router = express.Router();
var album = require('../album');

/* GET list all albums */
router.get('/', function(req, res, next) {
  res.render('index', { 
      title: 'Photo Album',
      albums: album.list().map(albumAttribute)
    });
});

function albumAttribute(albumName) {
  return {name: albumName, link: './' + albumName};
}

/* GET one album */
router.get('/:albumName', function(req, res, next) {
  const albumName = req.params['albumName'];
  res.render('album', { 
    title: albumName,
    photos: album.listPhotoNames(albumName).map(photoName => photoEntry(albumName, photoName))
    });
});

function photoEntry(albumName, photoName) {
  return {
    name: photoName, 
    link: './' + albumName + '/' + photoName
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
