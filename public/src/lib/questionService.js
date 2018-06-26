import axios from 'axios'
import UserService from './userService'
import config from './config'

class QuestionService {
  static get questionServiceNoLogin () {
    let service = axios.create({
      baseURL: `${config.url}/questionN`
    })
    service.defaults.timeout = config.timeOut
    return service
  }

  static get questionService () {
    let service = axios.create({
      baseURL: `${config.url}/question`,
      headers: {
        'x-access-token': UserService.token
      }
    })
    service.defaults.timeout = 12000;

    return service
  }

  static async getChaptersN () {
    return await QuestionService.questionServiceNoLogin.get('/chapters')
  }

  static async getQuestions (data) {
    return await QuestionService.questionServiceNoLogin.post('/questions', data)
  }

  static async uploadQuestions (data) {
    return await QuestionService.questionService.post('/upload', data)
  }
}

export default QuestionService