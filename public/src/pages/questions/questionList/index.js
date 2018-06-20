import React, {Component} from 'react'
import Questions from '../../../asset/questions.png'
import './index.scss'

class QuestionList extends Component {
  render () {
    return (
      <section className="questions-list">
        <article className="question-title"><img src={Questions} alt="试题列表" />试题列表</article>
        
      </section>
    )
  }
}

export default QuestionList
