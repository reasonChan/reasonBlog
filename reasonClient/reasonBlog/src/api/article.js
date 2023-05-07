import request from "../utils/request.js";
export function getArticleListByTag(tag){
    return request({
        method: 'get',
        url: '/api/articles/list',
        params: {
            tag
        }
    })
}
export function getArticleList(tag){
    return request({
        method: 'get',
        url: '/api/articles/list',
        params: {
            tag
        }
    })
}
export function getTitleListByTag(tag){
    return request({
        method: 'get',
        url: '/api/articles/title',
        params: {
            tag
        }
    })
}
export function getTitleList(){
    return request({
        method: 'get',
        url: '/api/articles/title',
    })
}
export function getArticleById(id){
    return request({
        method: 'get',
        url: '/api/articles/content',
        params: {
            id
        }
    })
}

