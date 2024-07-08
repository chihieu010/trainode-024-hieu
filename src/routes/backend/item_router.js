var express = require('express');
var router = express.Router();

const ItemController = require("../../controllers/item_controller")
router.get('/', ItemController.getAll)
router.get('/form(/:id)?', ItemController.getForm)
router.post('/form', ItemController.add)
router.get('/delete/:id', ItemController.delete)
router.get('/changeStatus/:id/:status', ItemController.changeStatus)
router.get('/changeOrdering/:id/:ordering', ItemController.changeOrdering)

module.exports = router;

