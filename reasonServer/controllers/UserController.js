const UserService = require("../services/UserService")
const JWT = require("../util/jwt");
const UserController = {
    addUser: async (req, res) => {
        console.log(req.body)
        const {username, password, age} = req.body
        const data = await UserService.addUser(username, password, age)
        res.send({
            ok:200,
            message: 'insert ok',
            data
        })
    },
    getUser: async (req, res) => {
        const {page, limit} = req.query
        const data = await UserService.getUser(page, limit)
        console.log(data)
        res.send(data)
    },
    delUser: async (req, res) => {
        const data = await UserService.delUser(req.params.userId)
        res.send({
            ok:1,
            message: 'delete ok',
            data
        })
    },
    updateUser: async (req, res) => {
        const {username, age, password} = req.body
        const data = await UserService.updateUser(req.params.userId, username, age, password)
        res.send({
            ok:1,
            message: 'put ok',
            data
        })
    },
    login: async (req, res) => {
        const {username, password} = req.body
        const data = await UserService.login(username, password)
        if(data.length === 0){
            res.send({
                code: 0,  //没有此用户
                msg: "登录失败"
            })
        }else {
            const token = JWT.generate({
                _id: data[0]._id,
                username: data[0].username
            }, "1d") //生成token
            res.header("Authorization", token)
            res.send({
                code : 1,
                msg: "登录成功"
            })
        }
    },

}
module.exports = UserController