var express = require('express');
var router = express.Router();

const WidgetsController = require("../../controllers/widgets_controller")
router.get('/', WidgetsController.getAll)


module.exports = router;