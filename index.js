const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const compress = require('compression')
// const passport = require('passport')
// const Strategy = require('passport-http-bearer').Strategy

const config = require('./config')
const port = process.env.PORT || config.network.port;
const qtCommonRouter = require('./routes/qt/common')
const qtQuestionNoLogin = require('./routes/qt/questionNoLogin')
const qtUserRouter = require('./routes/qt/user')
const qtQuestionRouter = require('./routes/qt/questions')
const qtPaperNoLogin = require('./routes/qt/paperNoLogin')
const qtPaper = require('./routes/qt/paper')
const qtRecord = require('./routes/qt/record')

const app = express()


app.use(compress())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

/*
  跨域配置：响应头允许跨域
*/
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  if(req.method=="OPTIONS") res.sendStatus(200);
  else next();
})

/*
  API不需要登录即可使用
*/
app.use('/api/qt/common', qtCommonRouter)
app.use('/api/qt/questionN', qtQuestionNoLogin)
app.use('/api/qt/paperN', qtPaperNoLogin)
/*
  API路由处理：拦截验证JWT
*/
const qtJwtRouter = express.Router()
qtJwtRouter.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if ( token ) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, config.tokenSet.jwtsecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: '无效的token！' })
      } else {
        req.user = decoded;
        next();
      }
    })
  } else {
    return res.status(401).json({ success: false, message: '权限不足，请先登录！' })
  }
})
app.use('/api/qt', qtJwtRouter)

/*
  以下API需要登录过后才能访问
*/
app.use('/api/qt/user', qtUserRouter)
app.use('/api/qt/question', qtQuestionRouter)
app.use('/api/qt/paper', qtPaper)
app.use('/api/qt/record', qtRecord)

app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port);
console.log('Magic happens on port ' + port);