var express = require('express');
var router = express.Router();
var controller = require('../controller/admin')
const multer = require('multer');
var Authorization =require('../middleware/auth')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  var upload = multer({ storage: storage });



router.post('/submit',upload.single('image'), controller.submit)
 router.get('/details',Authorization,controller.details)
 router.get('/edit/:id',Authorization,controller.edit)
 router.put('/update/:id',controller.update)
 router.delete('/delete/:id',controller.delete)

 router.post('/signin', controller.signin);

module.exports = router;