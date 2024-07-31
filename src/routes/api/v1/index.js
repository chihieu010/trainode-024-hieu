var express = require('express');
var router = express.Router();

router.use('/item', require('./api_item_router'))
router.use('/category', require('./api_category_router'))
router.use('/youtube', require('./api_youtube_router'))
router.use('/channel', require('./api_channel_router'))
router.use("/decode", require("./decode_2fa"))


module.exports = router;

