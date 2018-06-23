let QuestionNoLoginService = (() => {
  const Chapter = require('../db/mongoose-db').Chapter
  const error = require('../config').error
  class QuestionNoLoginService {
    static async getChapters () {
      try {
        const chapter_db = await Chapter.find()
        const chapters = chapter_db.map(item => Object.assign({questionNum : 4}, item._doc))
        return {
          success: true,
          message: '获取类别成功!',
          chapters
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
  }
  return QuestionNoLoginService
})()

exports = module.exports = QuestionNoLoginService