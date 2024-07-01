var express = require('express');
var router = express.Router();

router.use('/', require('./dashboard_router'))
router.use('/item', require('./item_router'))
router.use('/widgets', require('./widgets_router'))
router.use('/user', require('./user_router'))



module.exports = router;

