import Http from './httpCreate'
import UserService from './userService'
import config from './config'

class PaperService {
  static get paperServiceNoLogin () {
    let service = Http.create({
      baseURL: `${config.url}/paperN`,
      timeout: config.timeOut
    })
    return service
  }

  static get paperService () {
    let service = Http.create({
      baseURL: `${config.url}/paper`,
      timeout: config.timeOut
    })

    return service
  }

  static async getPapers (data) {
    return await PaperService.paperServiceNoLogin.post('/getPapers', data)
  }

  static async getLike (paperId) {
    return await PaperService.paperServiceNoLogin.post('/getLike', {paperId})
  }

  static async getDislike (paperId) {
    return await PaperService.paperServiceNoLogin.post('/getDislike', {paperId})
  }

  static async likeIt (paperId) {
    return await PaperService.paperService.post('/likeIt', {paperId})
  }

  static async dislikeIt (paperId) {
    return await PaperService.paperService.post('/dislikeIt', {paperId})
  }
}

export default PaperService