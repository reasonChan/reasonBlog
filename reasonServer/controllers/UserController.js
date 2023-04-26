const UserService = require("../services/UserService")
const JWT = require("../util/jwt");
const UserController = {
    addUser: async (req, res) => {
        const {username, password} = req.body
        const data = await UserService.addUser(username, password)
        const {_id} = data
        res.send({
            code:200,
            message: '添加用户成功',
            _id
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
                code: 401,  //没有此用户
                msg: "登录失败"
            })
        }else {
            const token = JWT.generate({
                _id: data[0]._id,
                username: data[0].username
            }, "1d") //生成token
            res.header("Authorization", token)
            res.send({
                code : 200,
                msg: "登录成功",
                token
            })
        }
    },

}
module.exports = UserController