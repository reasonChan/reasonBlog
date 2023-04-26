const express = require('express');
const UploadImgController = require("../controllers/UploadImgController");
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: './public/images'}).array('wangeditor-uploaded-image')

router.post('/images', upload, UploadImgController.getUrlByUploadImg)
module.exports = router

