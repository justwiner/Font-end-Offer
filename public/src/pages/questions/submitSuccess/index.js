import React, { Component } from 'react'
import {Button, Select, message} from 'antd'
import answers from '../../../asset/answers.png'
import AnalysisInfo from './AnalysisInfo'
import QuestionAnswerInfo from './QuestionAnswerInfo'
import FastDoQuestionModal from '../fastDoQuestionModal'
import './index.scss'

class SubmitSuccess extends Component {
  state = {
    currentQuestion: 0,
    visible: false,
    paperInfo: null
  }
  componentWillMount () {
    const {paperInfo} = this.props.location.state.data
    this.setState ({ paperInfo })
  }
  getResults = (result) => {
    let trueNum = 0
    result.forEach(e => {
      if (e === true) {
        trueNum ++
      }
    });
    return {
      mark: ((trueNum/result.length)*100).toFixed(2),
      trueNum,
      total: result.length
    }
  }
  getTrueAnswer = (question) => {
    const answers_value = question.answers;
    let answer = []
    answers_value.forEach(e => {
      for ( let i = 0 ; i < question.options.length; i++ ) {
        if ( question.options[i].value === e ) {
          answer.push(i)
          break;
        }
      }
    })
    return answer
  }
  getUserAnswer = (userAnswers) => {
    if (userAnswers === undefined) {
      return []
    }
    return userAnswers.map(e => e)
  }
  handleClick = index => {
    this.setState({ currentQuestion: index })
  }
  showModal = () => {
    const { user } = this.props
    if ( user.avatar === '' ) {
      message.warn('请先登录！',2)
      return
    }
    this.setState({ visible: true })
  }
  changePaperInfo = (type) => {
    const { paperInfo } = this.state
    switch (type) {
      case 0: paperInfo.like.push('temp'); this.setState({ paperInfo }); break;
      case 1: paperInfo.dislike.push('temp'); this.setState({ paperInfo }); break;
      default : return
    }
  }
  render () {
    const { result, questions, answer, time } = this.props.location.state.data
    const { currentQuestion, paperInfo } = this.state
    const { difficultyLevels } = this.props.question
    const mark = this.getResults(result)
    let trueAnswers = this.getTrueAnswer(questions[currentQuestion]),
        userAnswers = this.getUserAnswer(answer[currentQuestion])
    return (
      <section className="doQuestions-analysis">
        <AnalysisInfo 
        time={time} 
        paperInfo= { paperInfo } 
        difficultyLevels={difficultyLevels} 
        mark={mark}
        changePaperInfo={this.changePaperInfo}
        {...this.props}/>
        <section className="doQuestions-analysis-answer">
          <article>
            <img src={answers} alt="答案解析" />
            <font>答案</font>
          </article>
          <section className="doQuestions-analysis-answer-questions">
            <ul>
              {
                result.map((e, index) => {
                  let style = {}
                  style = e ? {background: 'rgb(41, 189, 185)'} : {background: 'rgb(255, 120, 117)'}
                  style = (currentQuestion === index) ? Object.assign({}, { height: '2.5vw',lineHeight: '2.5vw' }, style) : style
                  return <li onClick={() => {this.handleClick(index)}} key={index}><span style={style}>{index + 1}</span></li>
                })
              }
            </ul>
            <QuestionAnswerInfo 
            question= {questions[currentQuestion]} 
            trueAnswers={trueAnswers}  
            userAnswers= {userAnswers} 
            result= {result[currentQuestion]}/>
          </section>
          <section className="doQuestions-button">
            <Button onClick={() => { this.props.history.push('/questions') }}>返回题库</Button>
            <Button onClick={this.showModal} type="primary">再战</Button>
            <FastDoQuestionModal visible={this.state.visible} { ...this.props }/>
          </section>
        </section>
      </section>
    )
  }
}

export default SubmitSuccess