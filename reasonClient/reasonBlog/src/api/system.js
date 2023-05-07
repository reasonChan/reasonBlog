import request from "../utils/request.js";

//新增文章
export function addArticle(tag, title, content, abstract) {
    return request({
        url: '/api/system/add',
        method: 'post',
        data: {
            tag,
            title,
            content,
            abstract
        }
    })
}
export function updateArticle(tag, title, content, abstract, articleId) {
    return request({
        url: '/api/system/update',
        method: 'put',
        data: {
            tag,
            title,
            content,
            abstract,
            articleId
        }
    })
}
export function getTitleList(){
    return request({
        method: 'get',
        url: '/api/system/title',
    })
}
export function getArticleById(id){
    return request({
        method: 'get',
        url: '/api/system/content',
        params: {
            id
        }
    })
}
