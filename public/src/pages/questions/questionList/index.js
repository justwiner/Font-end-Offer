import React, {Component} from 'react'
import Questions from '../../../asset/questions.png'
import './index.scss'

class QuestionList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSearch: [0],
      currentDifficults: [0],
      currentSortBy: 0
    }
  }
  componentDidUpdate () {
    const {chapters, difficultyLevels, sortBy}  = this.props.question
    const {currentDifficults, currentSortBy, currentSearch} = this.state
    this.renderMenuItems(currentSearch,chapters, 'question-menu-focus', 'chapter-')
    this.renderMenuItems(currentDifficults,difficultyLevels, 'question-menu-focus', 'difficult-')
    this.renderMenuItems(currentSortBy,sortBy, 'question-menu-focus', 'sort-')
  }
  handleClickMenu = id => {
    let {currentSearch} = this.state
    currentSearch = this.RemoveDuplicates(currentSearch, id)
    this.setState({ currentSearch })
  }
  handleClickDifficult = id => {
    let {currentDifficults} = this.state
    currentDifficults = this.RemoveDuplicates(currentDifficults, id)
    this.setState({ currentDifficults })
  }
  handleClickSort = id => this.setState({ currentSortBy: id })

  RemoveDuplicates = (current, id) => {
    const index = current.indexOf(id)
    if ( index < 0 ) {
      current.push(id)
    } else {
      current.splice(index, 1)
    }
    current = current.length === 0 ? [0] : current
    return current
  }
  renderMenuItems (currentFoucs,all, focusClass, pre) {
    all.forEach(e => {
      document.getElementById(pre + e.id).setAttribute('class', '')
    })
    if ( typeof currentFoucs === 'number' ) {
      document.getElementById(pre + currentFoucs).setAttribute('class', focusClass)
    } else {
      currentFoucs.forEach(e => {
        document.getElementById(pre + e).setAttribute('class', focusClass)
      })
    }
  }
  render () {
    const { chapters, difficultyLevels, sortBy } = this.props.question
    const {currentSearch, currentDifficults, currentSortBy} = this.state
    return (
      <section className="questions-list">
        <article className="question-title"><img src={Questions} alt="试题列表" />试题列表</article>
        <section className="question-allQuestions">
          <section className="question-allQuestions-menus">
            <article>试题分类</article>
            <ul>
              {
                chapters.map((item, index) => <li id={`chapter-${item.id}`} onClick={() => this.handleClickMenu(item.id)} key={index}>{item.title}</li>)
              }
            </ul>
            <article>难度等级</article>
            <ul>
              {
                difficultyLevels.map((item, index) => <li id={`difficult-${item.id}`} onClick={() => this.handleClickDifficult(item.id)} key={index}>{item.title}</li>)
              }
            </ul>
            <article>排序方式</article>
            <ul>
              {
                sortBy.map((item, index) => <li id={`sort-${item.id}`} onClick={() => this.handleClickSort(item.id)} key={index}>{item.title}</li>)
              }
            </ul>
          </section>
          <section className="question-allQuestions-list">
            <p>当前选择分类</p>
            {
              currentSearch.map((item, index) => <span key={index}>{item},</span>)
            }
            <p>当前选择难度</p>
            {
              currentDifficults.map((item, index) => <span key={index}>{item},</span>)
            }
            <p>当前排序方式</p>
            <span>{currentSortBy}</span>
          </section>
        </section>
      </section>
    )
  }
}

export default QuestionList
