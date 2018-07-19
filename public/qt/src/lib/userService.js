import config from './config'
import Http from './httpCreate'
import Cookie from './cookie'

class UserService {
  static get token () {
    return Cookie.get('token')
  }

  static get user () {
    let user = {}
    const strUser = Cookie.get('user')
    if (strUser !== "") {
      user = JSON.parse(strUser)
    } else {
      user = null
    }
    return user
  }

  static get CommonService () {
    let service = Http.create({
      baseURL: `${config.url}/user`,
      timeout: config.timeOut
    })
    return service
  }

  static async modifyPass (data) {
    return await UserService.CommonService.post('/pass', data)
  }

  static async modifyAvatar (data) {
    return await UserService.CommonService.post('/avatar', data)
  }

  static async userInfo () {
    return await UserService.CommonService.get('/info')
  }

  static async modify (data) {
    return await UserService.CommonService.post('/modify', data)
  }

  static async contributes () {
    return await UserService.CommonService.get('/contributes')
  }

  static async tests () {
    return await UserService.CommonService.get('/tests')
  }
}

export default UserService;