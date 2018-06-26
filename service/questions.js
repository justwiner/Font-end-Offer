const QuestionsService = ( () => {

  const moment = require('moment')
  const Question = require('../db/mongoose-db').Question
  const Paper = require('../db/mongoose-db').Paper
  const error = require('../config').error
  const uuid = require('node-uuid')
  const QuestionNoLoginService = require('./questionNoLogin')
  class QuestionsService {
    static async uploadQuestions (_data, userId) {
      try {
        const { data, battingType } = _data
        let uuids = []
        let uuid_ = ''
        let difficultyLevels = 0
        const createQuestionsPromise = data.map(item => {
          const { type, title, options, answers, sort, chapter, difficultyLevel } = item
          uuid_ = uuid.v4()
          uuids.push(uuid_)
          difficultyLevels += difficultyLevel
          return Question.create({
            id: uuid_,
            sort,
            type,
            chapter,
            difficultyLevel,
            title,
            options,
            answers,
            createAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            createBy: userId,
            like: [],
            dislike: []
          })
        })
        if (battingType) {
          const createPaperPromise = Paper.create({
            title: _data.title,
            questions: uuids,
            createAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            difficultyLevel: Math.round(difficultyLevels / data.length),
            createBy: userId,
            like: [],
            dislike: []
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

    static async doQuestionsAtOnce (chapter, difficultyLevel, questionNum) {
      try {
        let query     = QuestionNoLoginService.setQuery(chapter, difficultyLevel),
            questions = await Question.find(query).limit(questionNum)
        return {
          success: true,
          message: '自动生成试卷成功！',
          questions
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