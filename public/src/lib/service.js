import config from './config'
import axios from 'axios'

class Service {
  static get CommonService () {
    let service = axios.create({
      baseURL: `${config.url}/common`
    })
    service.defaults.timeout = 12000;
    return service
  }

  static async login (data) {
    return await Service.CommonService.post('/login', data)
  }

  static async register (data) {
    return await Service.CommonService.post('/register',data)
  }

  static async checkEMail (data) {
    return await Service.CommonService.post('/checkEMail',data)
  }
}

export default Service;