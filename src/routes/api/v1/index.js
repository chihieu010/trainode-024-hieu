var express = require('express');
var router = express.Router();

router.use('/item', require('./api_item_router'))
router.use('/category', require('./api_category_router'))
router.use('/getlink', require('./api_youtube_router'))
router.use('/running', require('./api_channel_router'))


module.exports = router;

