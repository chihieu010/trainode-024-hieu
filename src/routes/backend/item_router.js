var express = require('express');
var router = express.Router();

const ItemController = require("../../controllers/item_controller")
router.get('/', ItemController.getAll)
router.get('/form', ItemController.getForm)
router.post('/form', ItemController.add)
router.post('/delete/:id', ItemController.delete)



module.exports = router;

