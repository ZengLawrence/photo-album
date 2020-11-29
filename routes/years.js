var express = require('express');
var router = express.Router();
var chrono = require('../chrono');

/* GET list all years */
router.get('/', function (req, res, next) {
    res.render('years', {years: chrono.years()});
});

module.exports = router;
