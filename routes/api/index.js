const express = require('express');
const router = express.Router();

router.use('/albums', require('./album'));
router.use('/media', require('./media'));

module.exports = router;
