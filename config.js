module.exports = {
  'network' : {
    'port':2222
  },
  'user' : {
    'defaultHead' : 'http://www.luyuwen.cn:8080/fontEndCommunity/avatar/default/defaultHead.jpg'
  },
  'tokenSet': {
    'jwtsecret': 'fontEndCommunity',
    'time': 60*60*24
  },
  'database': 'mongodb://localhost:27017/fontFamily'
};