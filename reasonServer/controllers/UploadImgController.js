const fs = require('fs')
const constant = require('../config/constant')
// constant.serverUrl + `http://localhost:3000${file.destination.slice(2)}/${file.filename}.${ext}`
const UploadImgController = {
    getUrlByUploadImg: (req, res) => {
        if(req.files.length === 0){
            res.send({
                "errno": 1,
                "message": "上传失败"
            })
            return
        }
        for(let file of req.files){
            let ext = file.originalname.substring(file.originalname.lastIndexOf(".") + 1)
            fs.renameSync(file.path, file.path+'.'+ext)
            res.send({
                "errno": 0,
                "data": [
                    {
                    "url": constant.serverUrl + `${file.destination.slice(1)}/${file.filename}.${ext}`,
                    "alt": "",
                    "href": constant.serverUrl + `${file.destination.slice(1)}/${file.filename}.${ext}`
                    }
                ]
            })
        }
    }
}
module.exports = UploadImgController
