import Http from './httpCreate'
import config from './config'

class RecordService {
  static get recordService () {
    return Http.create({
      baseURL: `${config.url}/record`,
      timeout: config.timeOut
    })
  }

  static saveRecord (data) {
    return RecordService.recordService.post('/save', data)
  }
}

export default RecordService