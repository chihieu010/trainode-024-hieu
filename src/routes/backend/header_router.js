var express = require('express');
var router = express.Router();

const HeadersController = require("../../controllers/header_controller")
router.get('/home', HeadersController.getHome)
router.get('/contact', HeadersController.getContact)


module.exports = router;

