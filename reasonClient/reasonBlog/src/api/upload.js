import request from "../utils/request.js";
export function uploadImage(data) {
    return request({
        url: "/api/upload/images",
        method: "post",
        data: data,
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
