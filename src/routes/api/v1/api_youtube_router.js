var express = require('express');
var router = express.Router();
const youtubeController = require('../../../controllers/youtube_controller');
const {asyncHandle} = require('../../../apps/utils/asyncHandle')

router.get('/',asyncHandle(youtubeController.getAllApi))
router.delete('/idChannel',asyncHandle(youtubeController.deleteApi))

module.exports = router;