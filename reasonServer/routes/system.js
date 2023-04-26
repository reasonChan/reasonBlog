var express = require('express');
const ArticleController = require("../controllers/ArticleController")
var router = express.Router();

//管理员权限
router.post("/add", ArticleController.addArticle)  //新增文章
router.delete("/:articleId", ArticleController.delArticle)  //根据文章id删除文章
router.put("/:articleId", ArticleController.updateArticle)  //根据文章id更新文章

module.exports = router;
