const ArticleModel = require("../model/ArticleModel");
const ArticleService = {
    getArticlesListByTag: (tag) => {
        return ArticleModel.find({tag: tag}).
        sort({updatedAt: -1})  //时间降序排列， 最新的排在前面， 越新的时间戳越大
    },
    getArticlesListSortByTime: (page, limit) => {
        return ArticleModel.find({}).
        sort({updatedAt: -1}).
        skip((page-1)*limit).
        limit(limit)
    },
    addArticle: (title, content, author, tag, view = 0) => {
        return ArticleModel.create({
            title,
            content,
            author,
            tag,
            view
        })
    },
    updateArticle: (title, content, author, tag) => {
        return ArticleModel.updateOne({_id: id}, {
            title,
            content,
            author,
            tag,
        })
    },
    delArticle: (id) => {
        return  ArticleModel.deleteOne({
            _id: id
        })
    },

}
module.exports = ArticleService