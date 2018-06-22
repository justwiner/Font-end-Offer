const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const config = require('./config')
const jwt = require('jsonwebtoken')
// const Strategy = require('passport-http-bearer').Strategy

const port = process.env.PORT || config.network.port;
const commonRouter = require('./routes/common')
const userRouter = require('./routes/user')

const app = express()

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use(passport.initialize())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/common', commonRouter)

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
        req.decoded = decoded;
        console.log(decoded)
        next();
      }
    })
  } else {
    return res.status(403).json({ success: false, message: '权限不足，请先登录！' })
  }
})
app.use('/api', jwtRouter)

app.use('/api/user', userRouter)

app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port);
console.log('Magic happens on port ' + port);