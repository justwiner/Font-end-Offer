const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Strategy = require('passport-http-bearer').Strategy

const config = require('./config')
const port = process.env.PORT || config.network.port;
const commonRouter = require('./routes/common')
const questionNoLogin = require('./routes/questionNoLogin')
const userRouter = require('./routes/user')
const questionRouter = require('./routes/questions')
const paperNoLogin = require('./routes/paperNoLogin')
const paper = require('./routes/paper')

const app = express()

/*
  跨域配置：响应头允许跨域
*/
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  if(req.method=="OPTIONS") res.send(200);
  else next();
})

// 

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())


/*
  API不需要登录即可使用
*/
app.use('/api/common', commonRouter)
app.use('/api/questionN', questionNoLogin)
app.use('/api/paperN', paperNoLogin)
/*
  API路由处理：拦截验证JWT
*/
const jwtRouter = express.Router()
jwtRouter.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if ( token ) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, config.tokenSet.jwtsecret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: '无效的token！' })
      } else {
        req.user = decoded;
        next();
      }
    })
  } else {
    return res.status(403).json({ success: false, message: '权限不足，请先登录！' })
  }
})
app.use('/api', jwtRouter)

/*
  以下API需要登录过后才能访问
*/
app.use('/api/user', userRouter)
app.use('/api/question', questionRouter)
app.use('/api/paper', paper)

app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port);
console.log('Magic happens on port ' + port);