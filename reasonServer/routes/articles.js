var express = require('express');
const ArticleController = require("../controllers/ArticleController")
var router = express.Router();


router.get("/latest", ArticleController.getArticlesListSortByTime) //获取最新文章列表
router.get("/list", ArticleController.getArticlesListByTag) //根据分类标签获取文章列表
// router.post("/add", ArticleController.addArticle)

module.exports = router;
