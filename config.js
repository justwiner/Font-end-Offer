module.exports = {
  'network' : {
    'port':2222
  },
  'user' : {
    'defaultHead' : 'http://www.luyuwen.cn:8080/fontEndCommunity/avatar/default/defaultHead.jpg',
    'baseAvatarUrl': 'http://localhost:8080/avatar/'
  },
  'tokenSet': {
    'jwtsecret': 'fontEndCommunity',
    'time': 60*60*24
  },
  'email': {
    'jwtsecret': 'activation',
    'time': 60*60*24
  },
  'database': 'mongodb://localhost:27017/fontFamily',
  'front_url': 'http://localhost:1234/',
  'error': { 'success': false, 'message': '服务器出现问题' }
};