var express = require('express');
var router = express.Router();
var album = require('../album');
const image = require('../image');

/* GET one photo */
router.get('/:albumName/:photoName', function(req, res, next) {
  const albumName = req.params['albumName'];
  const photoName = getPhotoName(albumName, req.params['photoName']);
  if (!photoName) {
    res.status(404).end();
    return;
  }

  const fileName = album.getPhotoFileName(albumName, photoName);

  image.resize(
    {
      filePath: fileName, 
      width: 50, 
      height: 50
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

function getPhotoName(albumName, photoName) {
  if ("_cover" == photoName) {
    return album.listPhotoNames(albumName).shift();
  } else {
    return photoName;
  }
}

module.exports = router;
