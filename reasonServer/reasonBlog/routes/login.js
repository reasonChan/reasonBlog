const router = require('koa-router')()
const LoginController = require("../controller/LoginController")

router.post('/', LoginController.getUser())


module.exports = router
