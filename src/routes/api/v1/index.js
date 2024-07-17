var express = require('express');
var router = express.Router();

router.use('/item', require('./api_item_router'))
router.use('/category', require('./api_category_router'))




module.exports = router;

