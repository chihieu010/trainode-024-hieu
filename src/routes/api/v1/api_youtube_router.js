var express = require('express');
var router = express.Router();
const youtubeController = require('../../../controllers/youtube_controller');
const {asyncHandle} = require('../../../apps/utils/asyncHandle')

router.get('/',asyncHandle(youtubeController.createWithLinkChannel))
router.delete('/',asyncHandle(youtubeController.deleteApi))
router.get('/:idChannel',asyncHandle(youtubeController.getOneVideoWithChannelId))
router.get('/finish/:idVideo',asyncHandle(youtubeController.finish))
module.exports = router;