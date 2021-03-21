const express = require('express');
const router = express.Router();

router.use('/albums', require('./album'));
router.use('/years', require('./years'));
router.use('/media', require('./media'));

module.exports = router;
