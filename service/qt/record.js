const RecordService = (() => {
  const PaperRecord = require('../../db/mongoose-db').PaperRecord
  const QuesRecord = require('../../db/mongoose-db').QuesRecord
  const moment = require('moment')
  const error = require('../../config').error
  class RecordService {
    static async saveRecords (type, data, paperSaveInfo, userId) {
      try {
        if (type === 0) {
          const {paperId, title, time, correctRate} = paperSaveInfo
          await PaperRecord.create({
            createBy: userId,
            createAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            paperId,
            title,
            time,
            correctRate,
            result: data
          })
        } else {
          const quesRecordPromise = data.map(e => {
            const {questionId, success, title} = e
            QuesRecord.create({
              createBy: userId,
              createAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              questionId,
              result: success,
              title
            })
          })
          await Promise.all(quesRecordPromise)
        }
        return { success: true, message: '记录保存成功' }
      } catch (e) {
        console.log(e)
        return error
      }
    }
  }
  return RecordService
})()

exports = module.exports = RecordService