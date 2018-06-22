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
      baseURL: `${config.url}/common`,
      header: {
        'x-access-token': UserService.token
      }
    })
    service.defaults.timeout = 12000;
    return service
  }
}

export default UserService;