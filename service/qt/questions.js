const QuestionsService = ( () => {

  const moment = require('moment')
  const Question = require('../../db/mongoose-db').Question
  const Paper = require('../../db/mongoose-db').Paper
  const error = require('../../config').error
  const uuid = require('node-uuid')
  const QuestionNoLoginService = require('./questionNoLogin')
  class QuestionsService {
    static async uploadQuestions (_data, userId) {
      try {
        const { data, battingType } = _data
        let uuids = []
        let uuid_ = ''
        let difficultyLevels = 0
        const contributeQues = await Question.find({createBy: userId}, {_id: 1}),
           contributeQuesNum = contributeQues.length + 1;
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
            createAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            createBy: userId,
            like: [],
            dislike: [],
            likeNum: 0,
            dislikeNum: 0,
            complexValue: (100 + contributeQuesNum) / 1000
          })
        })
        const quesResult = await Promise.all(contributeQues.map(item => Question.findOne({_id: item._id}, {likeNum: 1})))
        const updateQuestionsPromise = contributeQues.map((item, index) => {
          const newComplexValue = (( quesResult[index].likeNum + 1 ) * 100 + contributeQuesNum) / 1000
          return Question.where({_id: item._id}).update({ complexValue: newComplexValue  })
        })
        if (battingType) {
          const contributePaper = await Paper.find({createBy: userId}, {_id: 1}),
              contributePaperNum = contributePaper.length + 1;
          const createPaperPromise = Paper.create({
            title: _data.title,
            questions: uuids,
            createAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            difficultyLevel: Math.round(difficultyLevels / data.length),
            createBy: userId,
            like: [],
            dislike: [],
            likeNum: 0,
            dislikeNum: 0,
            complexValue: (100 + contributePaperNum) / 1000
          })
          const paperResult = await Promise.all(contributePaper.map(item => Paper.findOne({_id: item._id}, {likeNum: 1})))
          const updatePaperPromise = contributePaper.map((item, index) => {
            const newComplexValue = (( paperResult[index].likeNum + 1 ) * 100 + contributePaperNum) / 1000
            return Paper.where({_id: item._id}).update({ complexValue: newComplexValue  })
          })
          await Promise.all(createQuestionsPromise.concat(updateQuestionsPromise, [createPaperPromise], updatePaperPromise))
          return { success: true, message: '上传 试卷 成功，感谢你对社区的贡献！' }
        } else {
          await Promise.all(createQuestionsPromise.concat(updateQuestionsPromise))
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
            questions = [],
            dbNum     = await Question.count(query)
        if (dbNum < questionNum) {
          questions = await Question.find(query)
        } else {
          questions = await Question.find(query).skip(Math.floor(Math.random() * ( dbNum - questionNum ))).limit(questionNum)
        }
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

    static async addRecords (type, title, questions, userId) {
      try {
        
      } catch (e) {
        console.log(e)
        return error
      }
    }

    static async likeIt (questionId, userId) {
      try {
        const result = await Question.find({ '_id': questionId, 'like': { '$in': [userId] } })
        if ( result === null || result.length === 0 ) {
          await Question.update({ '_id': questionId }, { '$push': {'like' : userId}, $inc: { likeNum: 1, complexValue: 0.1 } })
          return {
            success: true,
            message: '谢谢你的支持！'
          }
        }
        return {
          success: false,
          message: '你已经点过赞啦！'
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }

    static async dislikeIt (questionId, userId) {
      try {
        const result = await Question.find({ '_id': questionId, 'dislike': { '$in': [userId] } })
        if ( result === null || result.length === 0 ) {
          await Question.update({ '_id': questionId }, { '$push': {'dislike' : userId}, $inc: { dislikeNum: 1 } })
          return {
            success: true,
            message: '谢谢你的反馈！'
          }
        }
        return {
          success: false,
          message: '你已经讨厌过它一次了~'
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