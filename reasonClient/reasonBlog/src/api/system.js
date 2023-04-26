import request from "../utils/request.js";

//新增文章
export function addtArticle(tag, title, content, abstract) {
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
