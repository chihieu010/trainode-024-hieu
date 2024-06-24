var express = require('express');
var router = express.Router();

router.use('/admin', require('./backend'))
router.use('/', require('./frontend'))

module.exports = router;

