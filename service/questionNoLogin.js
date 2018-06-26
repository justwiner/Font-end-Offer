let QuestionNoLoginService = (() => {
  const Chapter = require('../db/mongoose-db').Chapter
  const Question = require('../db/mongoose-db').Question
  const error = require('../config').error
  class QuestionNoLoginService {
    static async getChapters () {
      try {
        const [ chapter_db, questionNum ] = await Promise.all([Chapter.find(),Question.count()])
        const questionNumsPromise = chapter_db.map(item => Question.count({ chapter: item._doc.id })),
          questionNums = await Promise.all(questionNumsPromise);
        let chapters = chapter_db.map((item, index) => Object.assign({questionNum : questionNums[index]}, item._doc))
        chapters[chapters.findIndex(e => e.id === 0)].questionNum = questionNum
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
    static async getQuestions (chapter, difficultyLevel, sortBy, size, page, key) {
      try {
        let questions = [],
          query = {},
          sort = {};
        query = ( chapter.includes(0) || chapter.includes('0') ) ? query : Object.assign({}, { chapter: {"$in": chapter} }, query)
        query = ( difficultyLevel.includes(0) || difficultyLevel.includes('0') ) ? query : Object.assign({}, { difficultyLevel: {"$in": difficultyLevel} }, query)
        query = ( key !== '' ) ? Object.assign({}, { title: new RegExp(key) }, query) : query
        switch (sortBy) {
          case 0: ;break;
          case 1: sort = Object.assign({}, { createAt: -1 }, sort); break;
          case 2: sort = Object.assign({}, { like: -1 }, sort); break;
          default: ;break
        }
        questions = await Question.find(query, null, sort).skip( (page - 1) * (size - 0) ).limit((size - 0))
        return {
          success: true,
          message: '获取试题成功!',
          questions
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