var express = require('express');
var router = express.Router();
const UserModel = require("../model/UserModel")
const UserController = require("../controllers/UserController")

/* GET users listing. */
router.post('/register', UserController.addUser);

router.put('/:userId', UserController.updateUser)
router.delete('/:userId', UserController.delUser)
router.get('/list', UserController.getUser);


//登录校验
router.post('/login', UserController.login)
module.exports = router;
