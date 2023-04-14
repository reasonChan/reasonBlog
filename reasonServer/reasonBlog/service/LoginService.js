const LoginModel = require("../model/LoginModel")
const LoginService = {
    getUser: () => {
        return LoginModel.find({}, ["username", "age"])
    }
}
module.exports = LoginService