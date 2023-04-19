import request from '../utils/request'
//登录方法
export function login(username, password) {
    return request({
        url: '',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
注册方法
export function logout() {
    return request({
        url: '',
        method: 'post'
    })
}