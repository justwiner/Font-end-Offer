import React, {Component} from 'react'
import Questions from '../../../asset/questions.png'
import './index.scss'

class QuestionList extends Component {
  render () {
    return (
      <section className="questions-list">
        <article className="question-title"><img src={Questions} alt="试题列表" />试题列表</article>
        <section className="question-allQuestions">
          <section className="question-allQuestions-menus">
            <article>试题分类</article>
            <ul>
              
            </ul>
          </section>
          <section className="question-allQuestions-list">list</section>
        </section>
      </section>
    )
  }
}

export default QuestionList
