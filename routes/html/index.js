var express = require('express');
var router = express.Router();

router.use('/albums', require('./album'));
router.use('/years', require('./years'));
router.use('/thumbnails', require('./thumbnails'));

module.exports = router;
