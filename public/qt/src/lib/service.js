import config from './config'
import Http from './httpCreate'

class Service {
  static get CommonService () {
    let service = Http.create({
      baseURL: `${config.url}/common`,
      timeout: config.timeOut
    })
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

  static async findPass (data) {
    return await Service.CommonService.post('/findPass',data)
  }
}

export default Service;