const ArticleService = require('../services/ArticleService')
const constant = require('../config/constant')
const ArticleController = {
    //新增文章
    addArticle: async (req, res) => {
        const {title, content, tag, abstract} = req.body
        const regex = /<img.*?src="(.*?)"/i;
        let img = ''
        if(regex.test(content)){
            img = content.match(regex)[1]    //若content有图片选第一张图片为img，没有则使用默认img
        }else {
            img = constant.defaultImg
        }
        await ArticleService.addArticle(title, content, tag, img, abstract)
        res.send({
            code: 200,
            msg: "发布文章成功"
        })
    },
    //获取最新文章列表
    getArticlesListSortByTime: async (req, res) => {
        const {page, limit} = req.query
        if(page < 0){
            res.send({
                code: 404,
                msg: 'page<0'
            })
            return
        }
        const data = await ArticleService.getArticlesListSortByTime(page, limit)
        res.send({
            code: 200,
            msg: "获取文章列表成功",
            data
        })
    },
    //根据分类标签tag获取文章
    getArticlesListByTag: async (req, res) => {
        const {tag} = req.query
        const data = await ArticleService.getArticlesListByTag(tag)
        res.send({
            code: 200,
            msg: "获取文章列表成功",
            data
        })
    },
    //根据文章id删除文章
    delArticle: async (req, res) => {
        res.send({
            code: 200,
            msg: "删除文章成功"
        })
    },
    //根据文章id编辑文章
    updateArticle: async (req, res) => {
        res.send({
            code: 200,
            msg: "修改文章成功"
        })
    },
}
module.exports = ArticleController
