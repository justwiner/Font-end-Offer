import React, {Component} from 'react'
import Questions from '../../../asset/questions.png'
import './index.scss'

class QuestionList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentSearch: [0]
    }
  }
  componentDidUpdate () {
    this.renderMenuItems(this.state.currentSearch)
  }
  handleClickMenu = id => {
    const {currentSearch} = this.state
    const index = currentSearch.indexOf(id)
    if ( index < 0 ) {
      currentSearch.push(id)
    } else {
      currentSearch.splice(index, 1)
    }
    this.setState({ currentSearch })
  }
  renderMenuItems (currentFoucs) {
    const {chapters}  = this.props
    chapters.forEach(e => {
      document.getElementById(e.id).setAttribute('class', '')
    })
    currentFoucs.forEach(e => {
      document.getElementById(e).setAttribute('class', 'question-menu-focus')
    })
  }
  render () {
    const { chapters } = this.props
    const {currentSearch} = this.state
    return (
      <section className="questions-list">
        <article className="question-title"><img src={Questions} alt="试题列表" />试题列表</article>
        <section className="question-allQuestions">
          <section className="question-allQuestions-menus">
            <article>试题分类</article>
            <ul>
              {
                chapters.map((item, index) => <li id={item.id} onClick={() => this.handleClickMenu(item.id)} key={index}>{item.title}</li>)
              }
            </ul>
          </section>
          <section className="question-allQuestions-list">
            <p>当前选择</p>
            {
              currentSearch.map((item, index) => <p key={index}>{item}</p>)
            }
          </section>
        </section>
      </section>
    )
  }
}

export default QuestionList
