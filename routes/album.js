var express = require('express');
var router = express.Router();
var album = require('../album');
const sharp = require('sharp');

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
  return '/albums/' + albumName + '/thumbnail';
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

/* GET thumbnail */
router.get('/:albumName/thumbnail', function(req, res, next) {
  const albumName = req.params['albumName'];
  const photoName = album.listPhotoNames(albumName).shift();
  const fileName = album.getPhotoFileName(albumName, photoName);
  sharp(fileName)
    .resize({
      width: 100,
      height: 100,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy
    })
    .withMetadata()
    .toBuffer()
    .then(data => {
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': data.length
      });
      res.write(data); 
      res.end();
    })
    .catch(err => console.error(err));
});

/* GET one photo */
router.get('/:albumName/:photoName', function(req, res, next) {
  const albumName = req.params['albumName'];
  const photoName = req.params['photoName'];
  const fileName = album.getPhotoFileName(albumName, photoName);
  res.sendFile(fileName);
});

module.exports = router;
