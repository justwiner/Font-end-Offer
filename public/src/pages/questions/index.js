import React, { Component } from 'react'
import ChapterClassify from './chapterClassify'
import QuestionList from './questionList'
import DoQuesAtOnce from './doQuesAtOnce'
import PaperList from './paperList'
import DoQuestion from './doQuestion'
import SubmitSuccess from './submitSuccess'
import {Route} from 'react-router-dom'
import './index.scss'

class Questions extends Component {
  render () {
    return (
      <section className="questions">
        <Route exact path="/questions" render={ () => (
          <section>
            <DoQuesAtOnce {...this.props}/>
            <ChapterClassify {...this.props}/>
            <QuestionList {...this.props}/>
            <PaperList  {...this.props}/>
          </section>
        )}/>
        <Route exact path="/questions/do" render={ () => <DoQuestion {...this.props} />}/>
        <Route exact path="/questions/analysis" render={ () => <SubmitSuccess {...this.props} />}/>
      </section>
    )
  }
}

export default Questions