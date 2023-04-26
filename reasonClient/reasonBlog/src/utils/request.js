import axios from 'axios'
import {user} from "../store/index.js";
axios.defaults.headers['Content-type'] = 'application/json;charset=utf-8'

const service = axios.create({
    baseURL : '/api',  //vite.config.js会把/api替换成服务端地址
    timeout: 10000
})

service.interceptors.request.use(config => {
    if(user().token && user().token.length !== 0){
        config.headers['Authorization'] = 'Bearer ' + user().token
    }
    if(config.method === 'get' && config.params){
        let url = config.url + '?'
        for(const [queryKey, queryValue] of Object.entries(config.params)){
            url += queryKey + '=' + queryValue
        }
    }
    return config
}, error => {
    Promise.reject(error)
})
service.interceptors.response.use(res => {
    const code = res.data.code
    // const message = res.data.msg
    if(code === 401){
        ElMessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                user().Logout()
                location.href = '/login'
            })
            .catch(() => {})
        return Promise.reject('令牌验证失败')
    }else if(code === 500){
        //服务端错误
    }else if(code === 200){
        console.log(res.headers["authorization"])
        user().RefreshToken(res.headers["authorization"])
        return res.data
    }else{
        console.log(res)
    }
}, error=>{
    console.log('error: ', error)
    Promise.reject(error)
})
export default service
