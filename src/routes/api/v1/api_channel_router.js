var express = require('express');
var router = express.Router();
const ChannelController = require('../../../controllers/channel_controller');
const {asyncHandle} = require('../../../apps/utils/asyncHandle')

router.get('/order',asyncHandle(ChannelController.order))
router.delete('/',asyncHandle(ChannelController.deleteChannel))

module.exports = router;