var express = require('express');
var router = express.Router();
const {asyncHandle} = require('../../../apps/utils/asyncHandle')

router.get('/',asyncHandle())

module.exports = router;