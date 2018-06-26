import React, { Component } from 'react'
import {Input, message} from 'antd'
import {QuestionService} from '../../../lib'
import Paper from '../../../asset/papers.png'
import './index.scss'

const Search = Input.Search;

class PaperList extends Component {
  state = {
    currentDifficultyLevel: [0],
    key: '',
    total: 0,
    papers: []
  }
  componentWillMount () {
    const {key, currentDifficultyLevel} = this.state
    this.getPaper(currentDifficultyLevel, key)
  }
  search = value => {
    this.setState({ key: value })
    const {currentDifficultyLevel} = this.state
    this.getPaper(currentDifficultyLevel, value)
  }
  setDifficultyLevels = id => {
    let { currentDifficultyLevel, key } = this.state
    const index = currentDifficultyLevel.findIndex(e => e === id)
    console.log(index)
    if ( index >= 0 ) {
      currentDifficultyLevel.splice(index, 1)
      currentDifficultyLevel = currentDifficultyLevel.length === 0 ? [0] : currentDifficultyLevel
    } else {
      currentDifficultyLevel.push(id)
    }
    this.setState({ currentDifficultyLevel })
    this.getPaper(currentDifficultyLevel, key)
  }
  getPaper = async (currentDifficultyLevel, key) => {
    const loading = message.loading('正在获取试卷...', 0)
    const data = (await QuestionService.getPapers({ currentDifficults: currentDifficultyLevel, key })).data
    loading()
    if (data.success) {
      console.log(data)
      this.setState({ total: data.total, papers: data.papers })
    } else {
      message.error(data.message, 2)
    }
  }
  render () {
    const { difficultyLevels } = this.props.question
    const { currentDifficultyLevel } = this.state
    return (
      <section className="question-paper">
        <article className="question-title"><img src={Paper} alt="试题列表" />试题列表</article>
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
        </section>
        <section className="question-paper-content">
        
        </section>
      </section>
    )
  }
}

export default PaperList