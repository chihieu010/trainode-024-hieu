var express = require('express');
var router = express.Router();

const ItemController = require("../../controllers/item_controller")
router.get('/', ItemController.getAll)
router.get('/add', ItemController.add)


module.exports = router;

