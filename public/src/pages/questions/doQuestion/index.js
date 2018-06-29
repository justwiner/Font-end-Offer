import React, { Component } from 'react'
import { message } from 'antd';
import {QuestionService} from '../../../lib'
import PaperInfo from './PaperInfo'
import Questions from './Questions'
import './index.scss'

class DoQuestion extends Component {
  state = {
    paperInfo: null,
    questions: [],
  }
  async componentWillMount () {
    const data = this.props.location.state;
    if (data.type === 0) {
      this.setState({ questions: data.data })
    } else {
      const loading = message.loading("正在获取试题列表...", 0)
      const {questions, createAt, createBy, difficultyLevel, like, dislike, title, _id} = data.data
      this.setState({ paperInfo: { createAt, createBy, difficultyLevel, like, dislike, title, _id } })
      const result = (await QuestionService.getQuestionsByIds(questions)).data
      loading()
      if ( result.success ) {
        this.setState({ questions: result.questions })
      } else {
        message.error(result.message)
      }
    }
  }
  likeIt = async (id) => {
    const {questions} = this.state
    questions[questions.findIndex(e => e._id === id)].like.push('temp')
    this.setState({ questions })
  }
  dislikeIt = async (id) => {
    const {questions} = this.state
    questions[questions.findIndex(e => e._id === id)].dislike.push('temp')
    this.setState({ questions })
  }
  render () {
    const { questions, paperInfo } = this.state
    const { difficultyLevels } = this.props.question
    return (
      <section className="doQuestions">
        <PaperInfo 
          paperInfo = {paperInfo} 
          questionLength = { questions.length } 
          difficultyLevels = { difficultyLevels } />
        {
          questions.length !== 0 ? (
            <Questions 
              questions= {questions}
              funLikeIt={this.likeIt}
              funDisLikeIt={this.dislikeIt}
              paperInfo = {paperInfo} 
              {...this.props}/>
          ) : (<section>无数据</section>)
        }
      </section>
    )
  }
}

export default DoQuestion