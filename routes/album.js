var express = require('express');
var router = express.Router();

/* GET one album */
router.get('/:albumName', function(req, res, next) {
  const albumName = req.params['albumName'];
  res.render('album', { 
    title: albumName,
    photos: ['photo 1', 'photo 2', 'photo 3']
    });
});

module.exports = router;
