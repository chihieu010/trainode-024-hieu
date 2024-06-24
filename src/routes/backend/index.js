var express = require('express');
var router = express.Router();

router.use('/', require('./dashboard_router'))
router.use('/item', require('./item_router'))


module.exports = router;

