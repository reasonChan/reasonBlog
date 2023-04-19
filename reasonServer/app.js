var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');
const administratorsRouter = require('./routes/administrators')
const JWT = require("./util/jwt");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/articles', articlesRouter);

//登录功能的中间件
app.use((req, res, next) => {
  if(req.url.includes("login")){
    next()
    return
  }
  const token = req.headers["authorization"]?.split(" ") //取出bearer后的字段
  if(token){  //如果携带了token就去验证，如果没携带就是路由的请求
    const payload = JWT.verify(token)
    if(payload){
      const newToken = JWT.generate({    //更新token
        _id: payload._id,
        username: payload.username
      })
      res.header("Authorization", newToken)
      next()
    }else {
      res.status(401).send({errCode: -1, errMessage: "token过期"})  //token验证失败
    }
  }else {
    res.status(401).send({errCode: -1, errMessage: "未登录"})
  }
})
//需要登录获取token才可访问的路由
app.use('/api/users', usersRouter);
app.use('/api/administrator', administratorsRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
