var express = require('express');
var router = express.Router();

router.use('/admin', require('./backend'))
router.use('/api/v1', require('./api/v1'))

module.exports = router;

