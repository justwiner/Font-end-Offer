import axios from 'axios'
import UserService from './userService'
import config from './config'

class QuestionService {
  static questionService (ifLogin = false) {
    let service = axios.create({
      baseURL: `${config.url}/questionN`
    })
    if (ifLogin) {
      service.defaults.headers = {
        'x-access-token': UserService.token
      }
    }
    service.defaults.timeout = config.timeOut

    return service
  }

  static async getChaptersN () {
    return await QuestionService.questionService().get('/chapters')
  }
}

export default QuestionService