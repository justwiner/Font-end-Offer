import React, { Component } from 'react'
import {Icon, message} from 'antd'
import moment from 'moment'
import {UserService} from '../../lib'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      likeNum: 0,
      dislikeNum: 0,
      contributeNum: 0,
      testNum: 0,
      contributes: {},
      tests: {},
      contributesLikesSort: [],
      contributesDislikesSort: [],
      contributesTimeSort: [],
      testTimeSort: []
    }
  }
  componentWillMount () {
    this.loadData()
  }
  async loadData () {
    const load = message.loading("正在统计您的所有信息...");
    const [res_contributes, res_tests] = await Promise.all([
      UserService.contributes(),
      UserService.tests()
    ]);
    load()
    const contributes = res_contributes.data,
          tests = res_tests.data,
          {papers, questions} = contributes.data,
          {testPapers, testQuestions} = tests.data,
          paperLikeNum = papers.reduce((preNum, curr) => preNum + curr.likeNum, 0),
          quesLikeNum = questions.reduce((preNum, curr) => preNum + curr.likeNum, 0),
          paperDislikeNum = papers.reduce((preNum, curr) => preNum + curr.dislikeNum, 0),
          quesDislikeNum = questions.reduce((preNum, curr) => preNum + curr.dislikeNum, 0),
          contributeNum = questions.length,
          paperTestNum = testPapers.length,
          quesTestNum = testQuestions.length,
          contributesLikesSort = this.likesSort(contributes),
          contributesDislikesSort = this.dislikesSort(contributes),
          contributesTimeSort = this.contributesTimesSort(contributes);
    
    console.log({contributes, tests})
    this.setState({
      likeNum: paperLikeNum + quesLikeNum,
      dislikeNum: paperDislikeNum + quesDislikeNum,
      testNum: quesTestNum + paperTestNum,
      contributeNum,
      contributes,
      tests,
      contributesLikesSort,
      contributesDislikesSort,
      contributesTimeSort
    })
  }
  likesSort (contributes) {
    const {papers, questions} = contributes.data
    let contributes_ = papers.concat(questions)
    contributes_.sort((pre, cur) => cur.likeNum - pre.likeNum)
    contributes_ = contributes_.map(e => {
      let item = {
        id: e._id,
        title: e.title,
        likeNum: e.likeNum,
        type: 0
      }
      if (!e.options) {
        item = Object.assign({}, item, {type: 1})
      }
      return item
    })
    return contributes_
  }
  dislikesSort (contributes) {
    const {papers, questions} = contributes.data
    let contributes_ = papers.concat(questions)
    contributes_.sort((pre, cur) => cur.dislikeNum - pre.dislikeNum)
    contributes_ = contributes_.map(e => {
      let item = {
        id: e._id,
        title: e.title,
        likeNum: e.dislikeNum,
        type: 0
      }
      if (!e.options) {
        item = Object.assign({}, item, {type: 1})
      }
      return item
    })
    return contributes_
  }
  contributesTimesSort (contributes) {
    const {papers, questions} = contributes.data
    let contributes_ = papers.concat(questions)
    contributes_.sort((pre, cur) => new Date(cur.createAt) - new Date(pre.createAt))
    contributes_ = contributes_.map(e => {
      let item = {
        id: e._id,
        title: e.title,
        createAt: e.createAt,
        type: 0
      }
      if (!e.options) {
        item = Object.assign({}, item, {type: 1})
      }
      return item
    })
    return contributes_
  }
  render () {
    const { likeNum, dislikeNum, contributeNum, testNum, contributesDislikesSort, contributesLikesSort, contributesTimeSort } = this.state
    return (
      <section className="userInfo-right-home">
        <section className="userInfo-right-home-achievement">
          <article>成就</article>
          <section className="userInfo-right-home-achievement-content">
            <section>
              <article>{likeNum}　次被赞<Icon type="like-o" style={{color: 'rgb(82, 196, 26)'}}/></article>
              <div className="likes-list">
                <span>
                  <font>标题</font>
                  <font style={{color:'rgba(0, 0, 0, 0.65)'}}>类型</font>
                  <font><Icon type="like-o" className="success"/></font>
                </span>
                {
                  contributesLikesSort.splice(0, 5).map(e => {
                    return (
                      <p>
                        <font>{e.title}</font>
                        <font>{e.type === 0 ? '试题' : '试卷'}</font>
                        <font className="success">{e.likeNum}</font>
                      </p>
                    )
                  })
                }
              </div>
            </section>
            <section>
              <article>{dislikeNum}　次被讨厌<Icon type="dislike-o" style={{color: '#ff4d4f'}} /></article>
              <div className="likes-list">
                <span>
                  <font>标题</font>
                  <font style={{color:'rgba(0, 0, 0, 0.65)'}}>类型</font>
                  <font><Icon type="dislike-o" className="error" /></font>
                </span>
                {
                  contributesDislikesSort.splice(0, 5).map(e => {
                    return (
                      <p>
                        <font>{e.title}</font>
                        <font>{e.type === 0 ? '试题' : '试卷'}</font>
                        <font className="error">{e.likeNum}</font>
                      </p>
                    )
                  })
                }
              </div>
            </section>
            <section>
              <article>{contributeNum}　次贡献<Icon type="upload" /></article>
              <div className="likes-list">
                <span>
                  <font>标题</font>
                  <font style={{color:'rgba(0, 0, 0, 0.65)'}}>类型</font>
                  <font>日期</font>
                </span>
                {
                  contributesTimeSort.splice(0, 5).map(e => {
                    return (
                      <p>
                        <font>{e.title}</font>
                        <font>{e.type === 0 ? '试题' : '试卷'}</font>
                        <font className="error">{moment(e.createAt).format('YYYY-MM-DD')}</font>
                      </p>
                    )
                  })
                }
              </div>
            </section>
            <section>
              <article>{testNum}　次试题测试<Icon type="form" /></article>
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default Home