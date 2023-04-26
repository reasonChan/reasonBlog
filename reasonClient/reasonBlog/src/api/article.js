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
