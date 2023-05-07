const ArticleModel = require("../model/ArticleModel");
const ArticleService = {
    getArticlesListByTag: (tag) => {
        return ArticleModel.find({tag: tag},["title","tag","updatedAt","views","_id","abstract","img"]).
        sort({updatedAt: -1})  //时间降序排列， 最新的排在前面， 越新的时间戳越大
    },
    getArticleContentById: (id) => {
        return ArticleModel.find({_id: id},["title","content","tag","updatedAt","views","_id"]).
        sort({updatedAt: -1})  //时间降序排列， 最新的排在前面， 越新的时间戳越大
    },
    getTitleListByTag: (tag) => {
        return ArticleModel.find({tag: tag},["title","tag","updatedAt","views","_id"]).
        sort({updatedAt: -1})  //时间降序排列， 最新的排在前面， 越新的时间戳越大
    },
    getTitleList: ()=> {
        return ArticleModel.find({}, ["title","tag","updatedAt","views","_id"])
    },
    getArticlesListSortByTime: (page, limit) => {
        return ArticleModel.find({}).
        sort({updatedAt: -1}).
        skip((page-1)*limit).
        limit(limit)
    },
    addArticle: (title, content, tag,img, abstract,view = 0) => {
        return ArticleModel.create({
            title,
            content,
            tag,
            view,
            img,
            abstract
        })
    },
    updateArticle: (title, content, tag, img, abstract, articleId, view = 0) => {
        console.log('update2', articleId)
        return ArticleModel.updateOne({_id: articleId}, {
            title,
            content,
            tag,
            view,
            img,
            abstract
        })
    },
    delArticle: (id) => {
        return  ArticleModel.deleteOne({
            _id: id
        })
    },

}
module.exports = ArticleService
