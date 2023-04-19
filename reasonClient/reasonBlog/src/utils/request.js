import axios from 'axios'

axios.defaults.headers['Content-type'] = 'application/json;charset=utf-8'

const service = axios.create({
    baseURL : '/api',  //vite.config.js会把/api替换成服务端地址
    timeout: 10000
})

service.interceptors.request.use(config => {
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
    const code = res.status
    const message = res.msg
    if(code === 401){
        //鉴权失败重新登录
    }else if(code === 500){
        //服务端错误
    }else if(code === 200){
        return res.data
    }else{
        console.log(res)
    }
}, error=>{
    console.log('error: ', error)
    Promise.reject(error)
})
export default service