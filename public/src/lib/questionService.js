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

  static async getPapers (data) {
    return await QuestionService.questionServiceNoLogin.post('/papers', data)
  }

  static async getQuestionsByIds (ids) {
    return await QuestionService.questionServiceNoLogin.post('/questionsByIds', {ids})
  }

  static async uploadQuestions (data) {
    return await QuestionService.questionService.post('/upload', data)
  }

  static async doQuesAtOnce (data) {
    return await QuestionService.questionService.post('/doQuesAtOnce', data)
  }

  static async likeIt (questionId) {
    return await QuestionService.questionService.post('/likeIt', {questionId})
  }

  static async dislikeIt (questionId) {
    return await QuestionService.questionService.post('/dislikeIt', {questionId})
  }
}

export default QuestionService