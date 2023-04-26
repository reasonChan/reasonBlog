import { defineStore } from 'pinia'
import {login, logout} from "../api/login.js";
import {getToken, setToken, removeToken} from "../utils/token.js";

export const user = defineStore('user', {
    state: () => {
        return {
            token: getToken(),
            username: '',
            articleTag: new Map([['js基础', 0],['动画渲染', 1],['性能优化', 2],['工程化和部署', 3],['开发日志', 4]]),
            sever_url: 'http://localhost:3000'
        }
    },
    actions: {
        Login(userInfo){
            const username = userInfo.username.trim()
            const password = userInfo.password
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    console.log(res)
                    setToken(res.token)
                    this.token = res.token
                    resolve()
                }).catch(e => reject(e))
            })
        },
        Logout() {
            removeToken()
            this.token = ''
        },
        RefreshToken(token){
            console.log(token)
            setToken(token)
            this.token = token
        }
    },
})
