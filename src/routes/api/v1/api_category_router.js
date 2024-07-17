var express = require('express');
const categoryController = require('../../../controllers/category_controller');
var router = express.Router();
const {asyncHandle} = require('../../../apps/utils/asyncHandle')

router.get('/',asyncHandle(categoryController.getAllApi))
router.get('/:id', asyncHandle(categoryController.getOneApi))
router.post('/',asyncHandle(categoryController.addApi))
router.delete('/:id',asyncHandle(categoryController.deleteApi))
router.put('/:id',asyncHandle(categoryController.updateApi))
module.exports = router;

