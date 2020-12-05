var express = require('express');
var router = express.Router();
var album = require('../album');
const image = require('../image');

/* GET one photo */
router.get('/:albumName/:photoName', function(req, res, next) {
  const albumName = req.params['albumName'];
  const photoName = req.params['photoName'];
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

module.exports = router;
