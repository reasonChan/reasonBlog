const UserModel = require("../model/UserModel");
const UserService = {
    getUser: (page, limit) => {
        return UserModel.find({}, ["username"]).sort({age: -1}).skip((page-1)*limit).limit(limit)
    },
    addUser: (username, password) => {
        return UserModel.create({
            username,
            password,
        })
    },
    updateUser: (id, username, password, age) => {
        return UserModel.updateOne({_id: id}, {
            username, age, password
        })
    },
    delUser: (id) => {
        return  UserModel.deleteOne({
            _id: id
        })
    },
    login: (username, password) => {
        return UserModel.find({username, password})
    }
}
module.exports = UserService