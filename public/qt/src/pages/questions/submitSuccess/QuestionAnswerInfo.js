import React, { Component } from 'react'

const OPTION = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class QuestionAnswerInfo extends Component {
  render () {
    const { question, trueAnswers, userAnswers, result } = this.props
    return (
      <section>
        <section className="questions-title"><pre>{question.title}</pre></section>
        <section className="questions-options">
          <div className="questions-options-result">
            <span>
              <label>正确答案：</label>
              <font>{ trueAnswers.map(e => OPTION[e] + ' ') }</font>
            </span>
            <span>
              <label>你的答案：</label>
              <font>{ userAnswers.length === 0 ? '无' : userAnswers.map(e => OPTION[e] + ' ') }</font>
            </span>
            <span>
              { result.success ? <font style={{color: '#52c41a'}}>(正确)</font> : <font style={{color: '#ff7875'}}>(错误)</font> }
            </span>
          </div>
          <div className="questions-options-content">
            {
              question.options.map((item, index) => {
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
    )
  }
}

export default QuestionAnswerInfo