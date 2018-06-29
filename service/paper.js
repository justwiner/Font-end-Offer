let PaperService = (() => {
  
  const Paper = require('../db/mongoose-db').Paper
  class PaperService {
    static async likeIt (questionId, userId) {
      try {
        const result = await Paper.find({ '_id': questionId, 'like': { '$in': [userId] } })
        if ( result === null || result.length === 0 ) {
          await Paper.update({ '_id': questionId }, { '$push': {'like' : userId} })
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
        const result = await Paper.find({ '_id': questionId, 'dislike': { '$in': [userId] } })
        if ( result === null || result.length === 0 ) {
          await Paper.update({ '_id': questionId }, { '$push': {'dislike' : userId} })
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
  return PaperService
})()

exports = module.exports = PaperService