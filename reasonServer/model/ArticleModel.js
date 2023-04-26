const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema({
    title: String,  //文章标题
    content: String,  //文章内容
    abstract: String, //文章梗概
    img: String,    //文章封面
    tag: Number,  //文章分类
    views: {
        type: Number,
        default: 0   //文章浏览量
    },
},{
    timestamps: true
})
const ArticleModel = mongoose.model("articles", ArticleSchema)
//user模型对应users集合
module.exports = ArticleModel
