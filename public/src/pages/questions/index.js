import React, { Component } from 'react'
import ChapterClassify from './chapterClassify'
import QuestionList from './questionList'
import './index.scss'

class Questions extends Component {
  render () {
    return (
      <section className="questions">
        <ChapterClassify {...this.props}/>
        <QuestionList {...this.props}/>
      </section>
    )
  }
}

export default Questions