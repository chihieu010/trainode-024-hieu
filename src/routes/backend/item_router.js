var express = require('express');
var router = express.Router();

const ItemController = require("../../controllers/item_controller")
router.get('/', ItemController.getAll)
router.get('/form', ItemController.getForm)
router.post('/form', ItemController.add)
router.get('/delete/:id', ItemController.delete)
router.get('/changeStatus/:id/:status', ItemController.changeStatus)
router.post('/changeOrdering/:id', ItemController.changeOrdering)
router.get('/?keyword=', ItemController.search)



module.exports = router;

