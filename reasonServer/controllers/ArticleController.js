const ArticleService = require('../services/ArticleService')
const ArticleController = {
    //新增文章
    addArticle: async (req, res) => {
        const {title, content, author, tag} = req.body
        await ArticleService.addArticle(title, content, author, tag)
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