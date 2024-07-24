var express = require('express');

var router = express.Router();
const item_controller = require('../../../controllers/item_controller');
const {asyncHandle} = require('../../../apps/utils/asyncHandle')
const {upload} = require('../../../apps/utils/upload_image')


router.get('/',asyncHandle(item_controller.getAllApi))
router.get('/:id', asyncHandle(item_controller.getOneApi))
router.post('/',asyncHandle(item_controller.addApi))
router.delete('/:id',asyncHandle(item_controller.deleteApi))
router.put('/:id',asyncHandle(item_controller.updateApi))
router.post('/upload/:id',upload.single('avatar'),asyncHandle(item_controller.uploadImage))
// router.put('/update', asyncHandle(item_controller.uploadImage))
module.exports = router;

