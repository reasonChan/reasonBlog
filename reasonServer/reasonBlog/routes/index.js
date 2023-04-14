const router = require('koa-router')()
const LoginRouter = require("login")

router.use('/login', LoginRouter.routes(), LoginRouter.allowedMethods())
module.exports = router
