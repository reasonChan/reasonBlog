const LoginService = require("../service/LoginService")
const LoginController = {
    getUser:  async (ctx, next) => {
        const {username, password} = ctx.request.body
        await LoginService.getUser()
        ctx.response.body = "ok 200" //
    },
}
module.exports = LoginController