import config from './config'
import axios from 'axios'
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
    let service = axios.create({
      baseURL: `${config.url}/user`,
      header: {
        'x-access-token': UserService.token
      }
    })
    service.defaults.headers = { 'x-access-token': UserService.token }
    service.defaults.timeout = config.timeOut;
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
}

export default UserService;