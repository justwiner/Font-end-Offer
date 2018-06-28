import React, { Component } from 'react'
import {Icon} from 'antd'
import answers from '../../../asset/answers.png'
import './index.scss'

const OPTION = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class SubmitSuccess extends Component {
  state = {
    currentQuestion: 0
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
    return userAnswers.map(e => e)
  }
  handleClick = index => {
    this.setState({ currentQuestion: index })
  }
  render () {
    const { result, questions, answer, paperInfo, time } = this.props.location.state.data
    const { currentQuestion } = this.state
    const { difficultyLevels } = this.props.question
    console.log({ result, questions, answer, paperInfo, time })
    const mark = this.getResults(result)
    let difficultStyle = {}
    if (paperInfo !== null) {
      switch (paperInfo.difficultyLevel) {
        case 1: difficultStyle = { color: '#73d13d' } ;break;
        case 2: difficultStyle = { color: '#1890ff' } ;break;
        case 3: difficultStyle = { color: '#ff4d4f' } ;break;
      }
    }
    let trueAnswers = this.getTrueAnswer(questions[currentQuestion]),
        userAnswers = this.getUserAnswer(answer[currentQuestion])
    return (
      <section className="doQuestions-analysis">
        <section className="doQuestions-analysis-report">
          <article>
            <Icon type="pie-chart" />
            <font>分数 : { mark.mark }</font>
          </article>
          {
            paperInfo !== null ? (
              <p>
                <label>试卷</label>:
                <font>{paperInfo.title}</font>
              </p>
            ) : <p />
          }
          {
            paperInfo !== null ? (
              <p>
                <label>难度</label>:
                <font style={difficultStyle}>{difficultyLevels.find(e => e.id === paperInfo.difficultyLevel).title}</font>
              </p>
            ) : <p />
          }
          <p>
            <label>正确数</label>:
            <font>
              <span style={{color: '#52c41a'}}>{mark.trueNum}</span>
              /
              <span>{mark.total}</span>
            </font>
          </p>
          <p>
            <label>得分</label>:
            <font style={{color: '#ff7875'}}>{mark.mark}</font>
          </p>
          <p>
            <label>用时</label>:
            <font style={{color: '#52c41a'}}>{time}</font>
          </p>
        </section>
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
                  return <li onClick={() => {this.handleClick(index)}} style={style} key={index}>{index + 1}</li>
                })
              }
            </ul>
            <section className="questions-title">{questions[currentQuestion].title}</section>
            <section className="questions-options">
              <div className="questions-options-result">
                <span>
                  <label>正确答案：</label>
                  <font>{ trueAnswers.map(e => OPTION[e] + ' ') }</font>
                </span>
                <span>
                  <label>你的答案：</label>
                  <font>{ userAnswers.map(e => OPTION[e] + ' ') }</font>
                </span>
                <span>
                  { result[currentQuestion] ? <font style={{color: '#52c41a'}}>(正确)</font> : <font style={{color: '#ff7875'}}>(错误)</font> }
                </span>
              </div>
              <div className="questions-options-content">
                {
                  questions[currentQuestion].options.map((item, index) => {
                    let style = {}
                    if ( userAnswers.includes(index) ) {
                      style = { borderColor: 'rgb(255, 120, 117)' }
                    }
                    if ( trueAnswers.includes(index) ) {
                      style = { borderColor: 'rgb(41, 189, 185)' }
                    }
                    return <div style={style} className="question-answer-options" key={index}>{ item.label }</div>
                  })
                }
              </div>
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default SubmitSuccess