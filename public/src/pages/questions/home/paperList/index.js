import React, { Component } from 'react'
import {Input, message, Pagination} from 'antd'
import {PaperService} from '../../../../lib'
import timeago from 'timeago.js'
import Paper from '../../../../asset/papers.png'
import './index.scss'

const Search = Input.Search;

class PaperList extends Component {
  state = {
    currentDifficultyLevel: [0],
    currentSortBy: 0,
    key: '',
    total: 0,
    papers: [],
    page: 1,
    size: 4
  }
  componentWillMount () {
    const {key, currentDifficultyLevel, currentSortBy, page, size} = this.state
    this.getPaper(currentDifficultyLevel, key, currentSortBy, page, size)
  }
  search = value => {
    this.setState({ key: value })
    const {currentDifficultyLevel, currentSortBy, size} = this.state
    this.getPaper(currentDifficultyLevel, value, currentSortBy, 1, size)
    this.setState({ page: 1 })
  }
  setDifficultyLevels = id => {
    let { currentDifficultyLevel, key, currentSortBy, size } = this.state
    const index = currentDifficultyLevel.findIndex(e => e === id)
    if ( index >= 0 ) {
      currentDifficultyLevel.splice(index, 1)
      currentDifficultyLevel = currentDifficultyLevel.length === 0 ? [0] : currentDifficultyLevel
    } else {
      currentDifficultyLevel.push(id)
    }
    this.setState({ currentDifficultyLevel })
    this.getPaper(currentDifficultyLevel, key, currentSortBy, 1, size)
    this.setState({ page: 1 })
  }
  setSortBy = id => {
    let { currentDifficultyLevel, key, size } = this.state
    this.setState({ currentSortBy: id })
    this.getPaper(currentDifficultyLevel, key, id, 1, size)
    this.setState({ page: 1 })
  }
  onChange = (page, pageSize) => {
    const {currentDifficultyLevel, key, currentSortBy} =this.state
    this.setState({ page, size: pageSize })
    this.getPaper(currentDifficultyLevel, key, currentSortBy, page, pageSize)
  }
  getPaper = async (currentDifficultyLevel, key, currentSortBy, page, size) => {
    const loading = message.loading('正在获取试卷...', 0)
    const data = (await PaperService.getPapers({ currentDifficults: currentDifficultyLevel, key, sortBy: currentSortBy, page, size })).data
    loading()
    if (data.success) {
      this.setState({ total: data.total, papers: data.papers })
    } else {
      message.error(data.message, 2)
    }
  }
  doQuestions = (paper) => {
    const { user } = this.props
    if ( user.avatar === '' ) {
      message.warn('请先登录之后，再查看试卷。')
      return
    }
    this.props.history.push({ pathname: '/questions/do', state: { data: paper, type: 1 } })
  }
  render () {
    const { difficultyLevels, sortBy } = this.props.question
    const { currentDifficultyLevel, currentSortBy, total, papers, size, page } = this.state
    return (
      <section className="question-paper">
        <article className="question-title"><img src={Paper} alt="试题列表" />试卷</article>
        <section className="question-paper-search">
          <div>
            <Search size="large" style={{letterSpacing: 'normal', marginBottom: '2vw'}} enterButton placeholder="关键字搜索" onSearch={value => this.search(value)}/>
          </div>
          <div>
            <label>难度：</label>
            {
              difficultyLevels.map((item, index) => {
                let style = {}
                style = currentDifficultyLevel.includes(item.id) ? {color: '#28BEB8'} : {}
                return (<span onClick={() => this.setDifficultyLevels(item.id)} style={style} key={index}>{item.title}</span>)
              })
            }
          </div>
          <div>
            <label>排序方式：</label>
            {
              sortBy.map((item, index) => {
                let style = {}
                style = currentSortBy === item.id ? {color: '#28BEB8'} : {}
                return (<span onClick={() => this.setSortBy(item.id)} style={style} key={index}>{item.title}</span>)
              })
            }
          </div>
        </section>
        <section className="question-paper-content">
          {
            papers.map((item, index) => {
              let style = {}
              const difficultyLevel = item.difficultyLevel
              switch (difficultyLevel) {
                case 1: style = { color: '#73d13d' } ;break;
                case 2: style = { color: '#1890ff' } ;break;
                case 3: style = { color: '#ff4d4f' } ;break;
              }
              return (
                <section 
                  onClick={() => {this.doQuestions(item)}} 
                  key={index} 
                  className="question-paper-content-item">
                  <article>{item.title}</article>
                  <p>
                    <img src={item.createBy.avatar} alt={item.createBy.nickName}/>
                  </p>
                  <p>{timeago().format(item.createAt, 'zh_CN')}</p>
                  <p>
                    <span>共 <font>{item.questions.length}</font> 题</span>
                    <font>
                      <label>难度：</label>
                      <font style={style}>{difficultyLevels.find(e => e.id === difficultyLevel).title}</font>
                    </font>
                  </p>
                  <p>
                    <label>热度：</label>
                    <font>{item.like.length}</font>
                  </p>
                </section>
              )
            })
          }
        </section>
        <Pagination 
          style={{letterSpacing: 'normal', marginTop: '2vw'}}
          current={page}
          pageSize={size}
          size="small"
          total={total} 
          showQuickJumper
          onChange = {this.onChange}/>
      </section>
    )
  }
}

export default PaperList