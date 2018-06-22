import config from './config'
import axios from 'axios'
import Cookie from './cookie'

class Service {
  static get CommonService () {
    let service = axios.create({
      baseURL: `${config.url}`
    })
    service.defaults.timeout = 12000;
    return service
  }

  static async login (data) {
    return await Service.CommonService.post('/common/login', data)
  }
}

export default Service;