let PaperNoLoginService = (() => {
  const Paper = require('../../db/mongoose-db').Paper
  const User = require('../../db/mongoose-db').User
  const moment = require('moment')
  const error = require('../../config').error
  class PaperNoLoginService {
    static async getPapers (currentDifficults, sortBy, size, page, key) {
      try {
        let query = {},
             sort = {};
        query = ( currentDifficults.includes(0) || currentDifficults.includes('0') ) ? query : Object.assign({}, { difficultyLevel: {"$in": currentDifficults} }, query)
        query = ( key !== '' ) ? Object.assign({}, { title: new RegExp(key) }, query) : query
        switch (sortBy) {
          case 0: sort = Object.assign({}, { complexValue: -1 }, sort);break;
          case 1: sort = Object.assign({}, { createAt: -1 }, sort); break;
          case 2: sort = Object.assign({}, { likeNum: -1 }, sort); break;
          default: ;break
        }
        let [ total, papers ] = await Promise.all([
          Paper.count(query, null, {sort}),
          Paper.find(query, null, {sort}).skip( (page - 1) * (size - 0) ).limit((size - 0))
        ])
        let creatersPromise = papers.map(item => User.findOne({ _id: item.createBy })),
            creaters        = await Promise.all(creatersPromise);
            papers          = papers.map((item, index) => Object.assign({}, item._doc, {createBy: creaters[index], createAt: moment(item._doc.createAt).format('YYYY-MM-DD HH:mm:ss')}))
        return {
          success: true,
          message: '获取试题成功!',
          papers,
          total
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
    static async getLike (paperId) {
      try {
        const likes = (await Paper.findOne({'_id': paperId})).like
        return {
          success: true,
          message: '查询成功!',
          likes
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
    static async getDislike (paperId) {
      try {
        const dislikes = (await Paper.findOne({'_id': paperId})).dislike
        return {
          success: true,
          message: '查询成功!',
          dislikes
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
  }
  return PaperNoLoginService
})()

exports = module.exports = PaperNoLoginService
