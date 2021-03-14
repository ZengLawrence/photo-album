const { mapSeries } = require('async');
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
  image.resize(withOption(filePath, maxSize, req.query.square))
    .then(data => {
      res
        .status(200)
        .append('Content-Type', 'image/jpeg')
        .append('Content-Length', data.length)
        .append('Cache-Control', 'private, max-age=86400') // 1 day
        .end(data);
    }).catch(err => {
      console.error(err);
      res.status(404).end();
    });
});

function withOption(filePath, maxSize, square) {
  const fit = square != null ? image.FitEnum.cover : image.FitEnum.inside;
  return {
    filePath,
    width: maxSize,
    height: maxSize,
    fit
  };
}

function getIntOrDefault(val, defaultVal) {
  return val ? parseInt(val) : defaultVal;
}

module.exports = router;
