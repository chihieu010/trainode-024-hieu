const multer = require('multer')
var path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __uploadImg)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
  module.exports = {
    upload
  }