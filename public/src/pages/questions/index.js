import React, { Component } from 'react'
import ChapterClassify from './chapterClassify'
import QuestionList from './questionList'
import DoQuesAtOnce from './doQuesAtOnce'
import PaperList from './paperList'
import './index.scss'

class Questions extends Component {
  render () {
    return (
      <section className="questions">
        <DoQuesAtOnce {...this.props}/>
        <ChapterClassify {...this.props}/>
        <QuestionList {...this.props}/>
        <PaperList  {...this.props}/>
      </section>
    )
  }
}

export default Questions