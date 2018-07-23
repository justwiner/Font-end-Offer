import React, { Component } from 'react'
import {Icon, message} from 'antd'
import moment from 'moment'
import {UserService, QuestionService, PaperService} from '../../lib'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      likeNum: 0,
      dislikeNum: 0,
      contributeNum: 0,
      testNum: 0,
      contributes: {},
      tests: {}
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
          quesTestNum = testQuestions.length;
    this.setState({
      likeNum: paperLikeNum + quesLikeNum,
      dislikeNum: paperDislikeNum + quesDislikeNum,
      testNum: quesTestNum + paperTestNum,
      contributeNum,
      contributes,
      tests
    })
  }
  likesSort (contributes) {
    if (!contributes.data) return []
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
      } else {
        item = Object.assign({}, item, {id: e.id})
      }
      return item
    })
    return contributes_
  }
  dislikesSort (contributes) {
    if (!contributes.data) return []
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
      } else {
        item = Object.assign({}, item, {id: e.id})
      }
      return item
    })
    return contributes_
  }
  contributesTimesSort (contributes) {
    if (!contributes.data) return []
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
      } else {
        item = Object.assign({}, item, {id: e.id})
      }
      return item
    })
    return contributes_
  }
  testTimeSort (tests) {
    if (!tests.data) return []
    const {testPapers, testQuestions} = tests.data
    let test_ = testPapers.concat(testQuestions)
    test_.sort((pre, cur) => new Date(cur.createAt) - new Date(pre.createAt))
    test_ = test_.map(e => {
      let item = {
        title: e.title,
        createAt: e.createAt
      }
      if (!e.correctRate) {
        item = Object.assign({}, item, {statistics: e.result ? '正确' : '错误', type: 0, id: e.questionId})
      } else {
        item = Object.assign({}, item, {statistics: `${e.correctRate}%`, type: 1, id: e.paperId})
      }
      return item
    })
    return test_
  }
  async getDetalPage (item) {
    const loading = message.loading('请稍等...')
    switch (item.type) {
      case 0: {
        const data = (await QuestionService.getQuestionsByIds([item.id])).data
        this.props.history.push({ pathname: '/questions/do', state: { data: data.questions, type: 0 } })
      };break;
      case 1: {
        const paper = (await PaperService.getPapersByIds([item.id])).data.papers[0]
        this.props.history.push({ pathname: '/questions/do', state: { data: paper, type: 1 } })
      };break;
      default: ;break
    }
    loading()
  }
  render () {
    const { likeNum, dislikeNum, contributeNum, testNum, contributes, tests } = this.state
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
                  this.likesSort(contributes).splice(0, 5).map((e, i) => {
                    return (
                      <p key={i} onClick={() => this.getDetalPage(e)}>
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
                  this.dislikesSort(contributes).splice(0, 5).map((e, i) => {
                    return (
                      <p key={i} onClick={() => this.getDetalPage(e)}>
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
              <div className="likes-list contribute-list">
                <span>
                  <font>标题</font>
                  <font style={{color:'rgba(0, 0, 0, 0.65)'}}>类型</font>
                  <font>日期</font>
                </span>
                {
                  this.contributesTimesSort(contributes).splice(0, 5).map((e, i) => {
                    return (
                      <p key={i} onClick={() => this.getDetalPage(e)}>
                        <font>{e.title}</font>
                        <font>{e.type === 0 ? '试题' : '试卷'}</font>
                        <font>{moment(e.createAt).format('YYYY-MM-DD')}</font>
                      </p>
                    )
                  })
                }
              </div>
            </section>
            <section>
              <article>{testNum}　次试题测试<Icon type="form" /></article>
              <div className="likes-list contribute-list">
                <span>
                  <font>标题</font>
                  <font style={{color:'rgba(0, 0, 0, 0.65)'}}>统计</font>
                  <font>日期</font>
                </span>
                {
                  this.testTimeSort(tests).splice(0, 5).map((e, i) => {
                    return (
                      <p key={i} onClick={() => this.getDetalPage(e)}>
                        <font>{e.title}</font>
                        {
                          e.statistics === '错误' 
                          ? <font style={{color: '#ff4d4f'}}>{e.statistics}</font> 
                          : <font style={{color: '#52c41a'}}>{e.statistics}</font>
                        }
                        <font>{moment(e.createAt).format('YYYY-MM-DD')}</font>
                      </p>
                    )
                  })
                }
              </div>
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default Home