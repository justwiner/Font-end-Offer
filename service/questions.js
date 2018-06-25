const QuestionsService = ( () => {

  const Question = require('../db/mongoose-db').Question
  const Paper = require('../db/mongoose-db').Paper
  const error = require('../config').error
  const uuid = require('node-uuid')
  class QuestionsService {
    static async uploadQuestions (_data, userId) {
      try {
        const { data, battingType } = _data
        let uuids = []
        let uuid_ = ''
        const createQuestionsPromise = data.map(item => {
          const { type, title, options, answers, sort, chapter, difficultyLevel } = item
          uuid_ = uuid.v4()
          uuids.push(uuid_)
          return Question.create({
            id: uuid_,
            sort,
            type,
            chapter,
            difficultyLevel,
            title,
            options,
            answers,
            createAt: Date.now(),
            createBy: userId,
            evaluation: []
          })
        })
        if (battingType) {
          const createPaperPromise = Paper.create({
            title: _data.title,
            questions: uuids,
            createAt: Date.now(),
            createBy: userId,
            evaluation: []
          })
          await Promise.all(createQuestionsPromise, createPaperPromise)
          return { success: true, message: '上传 试卷 成功，感谢你对社区的贡献！' }
        } else {
          await Promise.all(createQuestionsPromise)
          return { success: true, message: '上传 试题 成功，感谢你对社区的贡献！' }
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
  }
  return QuestionsService
})()

exports = module.exports = QuestionsService