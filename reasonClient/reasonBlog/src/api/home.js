import request from "../utils/request.js";

//查询最新文章列表
export function latestArticles(query) {
    return request({
        url: '/api/articles/latest',
        method: 'get',
        params: query
    })
}
