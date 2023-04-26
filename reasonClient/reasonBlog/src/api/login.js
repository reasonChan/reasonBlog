import request from '../utils/request'
//登录方法
export function login(username, password) {
    return request({
        url: '/api/users/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function logout() {
    return request({
        url: '/api/users/logout',
        method: 'post'
    })
}
//注册
export function register(loginForm) {
    const {username, password} = loginForm
    return request({
        url: '/api/users/register',
        method: 'post',
        data: {
            username,
            password
        }
    })
}