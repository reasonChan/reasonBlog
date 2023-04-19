const mongoose = require("mongoose")

const UserType = {
    username: String,
    password: String,
}
const UserModel = mongoose.model("user", new mongoose.Schema(UserType))
//user模型对应users集合
module.exports = UserModel