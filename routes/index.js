var express = require('express');
var router = express.Router();
var album = require('../album');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
      title: 'Photo Album',
      albums: album.list()
    });
});

module.exports = router;
