var express = require('express');
const item_controller = require('../../../controllers/item_controller');
var router = express.Router();
const {asyncHandle} = require('../../../apps/utils/asyncHandle')

router.get('/',asyncHandle(item_controller.getAllApi))
router.get('/:id', asyncHandle(item_controller.getOneApi))
router.post('/',asyncHandle(item_controller.addApi))
router.delete('/:id',asyncHandle(item_controller.deleteApi))
router.put('/:id',asyncHandle(item_controller.updateApi))
router.put('/update', asyncHandle(item_controller.uploadImage))
module.exports = router;

