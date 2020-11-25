var express = require('express');
var router = express.Router();
var album = require('../album');

/* GET home page. */
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
    photos: ['photo 1', 'photo 2', 'photo 3']
    });
});

module.exports = router;
