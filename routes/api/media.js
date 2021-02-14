var express = require('express');
var router = express.Router();
var album = require('../../album');
const image = require('../../image');

/* GET one photo */
router.get('/:albumName/:photoName', function (req, res) {
  const albumName = req.params['albumName'];
  const photoName = req.params['photoName'];
  const maxSize = getIntOrDefault(req.query.maxSize, 50);

  const filePath = album.getPhotoFileName(albumName, photoName);
  image.resize(
      {
        filePath,
        width: maxSize,
        height: maxSize,
        fit: image.FitEnum.inside
      }).then(data => {
    res
      .status(200)
      .append('Content-Type', 'image/jpeg')
      .append('Content-Length', data.length)
      .end(data);
  }).catch(err => {
      console.error(err);
      res.status(404).end();
    });
});

function getIntOrDefault(val, defaultVal) {
  return val ? parseInt(val) : defaultVal;
}

module.exports = router;
