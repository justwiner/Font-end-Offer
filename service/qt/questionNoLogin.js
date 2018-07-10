let QuestionNoLoginService = (() => {

  const moment = require('moment')
  const Chapter = require('../../db/mongoose-db').Chapter
  const Question = require('../../db/mongoose-db').Question
  const User = require('../../db/mongoose-db').User
  const error = require('../../config').error
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
        let query = {},
            sort  = {};
        query = QuestionNoLoginService.setQuery(chapter, difficultyLevel)
        query = ( key !== '' ) ? Object.assign({}, { title: new RegExp(key) }, query) : query
        switch (sortBy) {
          case 0: sort = Object.assign({}, { complexValue: -1 }, sort);break;
          case 1: sort = Object.assign({}, { createAt: -1 }, sort); break;
          case 2: sort = Object.assign({}, { likeNum: -1 }, sort); break;
          default: ;break
        }
        let [ total, questions ] = await Promise.all([
          Question.count(query, null, {sort}),
          Question.find(query, null, {sort}).skip( (page - 1) * (size - 0) ).limit((size - 0))
        ])
        let creatersPromise = questions.map(item => User.findOne({ _id: item.createBy })),
            creaters        = await Promise.all(creatersPromise);
        questions = questions.map((item, index) => Object.assign({}, item._doc, {createBy: creaters[index], createAt: moment(item._doc.createAt).format('YYYY-MM-DD HH:mm:ss')}))
        return {
          success: true,
          message: '获取试题成功!',
          questions,
          total
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
    static setQuery (chapter, difficultyLevel) {
      let query = {}
      query = ( chapter.includes(0) || chapter.includes('0') ) ? query : Object.assign({}, { chapter: {"$in": chapter} }, query)
      query = ( difficultyLevel.includes(0) || difficultyLevel.includes('0') ) ? query : Object.assign({}, { difficultyLevel: {"$in": difficultyLevel} }, query)
      return query
    }
    static async getQuestionsByIds (ids) {
      try {
        const questionsPromise = ids.map(e => Question.find({ id: e }))
        let questions = await Promise.all(questionsPromise)
        questions = questions.map(item => item[0])
        return {
          success: true,
          message: '获取问题成功!',
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