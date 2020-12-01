var express = require('express');
var router = express.Router();
var album = require('../album');
const image = require('../image');

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
  if (!photoName) {
    res.status(404).end();
    return;
  }

  const fileName = album.getPhotoFileName(albumName, photoName);
  image.resize(
    {
      filePath: fileName, 
      width: 100, 
      height: 100
    })
    .then(data => {
      res
        .status(200)
        .append('Content-Type', 'image/jpeg')
        .append('Content-Length', data.length)
        .end(data);
    })
    .catch(err => { 
      console.error(err); 
      res.status(404).end();
    });
});

/* GET one photo */
router.get('/:albumName/:photoName', function(req, res, next) {
  const albumName = req.params['albumName'];
  const photoName = req.params['photoName'];
  const fileName = album.getPhotoFileName(albumName, photoName);
  res.sendFile(fileName);
});

module.exports = router;
