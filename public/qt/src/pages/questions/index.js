import React, { Component } from 'react'
import ChapterClassify from './home/chapterClassify'
import QuestionList from './home/questionList'
import DoQuesAtOnce from './home/doQuesAtOnce'
import PaperList from './home/paperList'
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