const RecordService = (() => {
  const PaperRecord = require('../../db/mongoose-db').PaperRecord
  const QuesRecord = require('../../db/mongoose-db').QuesRecord
  const error = require('../../config').error
  class RecordService {
    static async saveRecords (type, data, userId) {
      try {
        console.log({type, data, userId})
        return { success: true, message: '请求成功' }
      } catch (e) {
        console.log(e)
        return error
      }
    }
  }
  return RecordService
})()

exports = module.exports = RecordService