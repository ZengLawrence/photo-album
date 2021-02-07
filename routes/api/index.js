var express = require('express');
var router = express.Router();
const albumRouter = require('./album');

/* GET list all albums along with photo names*/
router.use('/albums', albumRouter);

module.exports = router;
