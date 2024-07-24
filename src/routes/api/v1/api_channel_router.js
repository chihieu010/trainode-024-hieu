var express = require('express');
var router = express.Router();
const youtubeController = require('../../../controllers/youtube_controller');
const {asyncHandle} = require('../../../apps/utils/asyncHandle')

router.get('/',asyncHandle(youtubeController.getAllApi))

module.exports = router;