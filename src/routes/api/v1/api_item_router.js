var express = require('express');
const item_controller = require('../../../controllers/item_controller');
var router = express.Router();

router.get('/',item_controller.getAllApi)
router.get('/:id', item_controller.getOneApi)
router.post('/',item_controller.addApi)
router.delete('/:id',item_controller.deleteApi)
router.put(':/id',item_controller.updateApi)

module.exports = router;

