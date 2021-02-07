var express = require('express');
var router = express.Router();
const album = require('./album');

/* GET list all albums along with photo names*/
router.get('/albums', function(req, res, next) {
  res.json({ 
      albums: album.fetchAll()
    });
});

module.exports = router;
