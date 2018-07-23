import React, { Component } from 'react'
import { Radio, Icon, Button, Progress, Checkbox, Collapse, Modal, message } from 'antd';
import {Timer}  from '../../../components'
import {QuestionService,RecordService} from '../../../lib'
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;

class Questions extends Component {
  state = {
    currentQuestion: 0,
    userAnswers: [],
    likeIcon: 'smile-o',
    dislikeIcon: 'frown-o',
    result: [],
    time: null,
    submitLoading: false
  }
  nextQuestion = () => this.goToQuestion(this.state.currentQuestion + 1)
  backQuestion = () => this.goToQuestion(this.state.currentQuestion - 1)
  goToQuestion = (index) => this.setState({ currentQuestion: index })
  setUserAnswer = (value, index) => {
    const { userAnswers } = this.state
    userAnswers[index] = value
    this.setState({ userAnswers })
  }
  submit = () => {
    const { userAnswers } = this.state
    const { questions } = this.props
    this.checkAnswer( userAnswers, questions, this.refs.timer.stop())
  }
  submitAdvance = () => {
    confirm({
      title: '确定提前交卷?',
      content: '你还有一些题目没有完成，详情请看答题卡。',
      okText: '确定提前交卷',
      cancelText: '不，我点错了',
      onOk: () => {
        const { userAnswers } = this.state
        const { questions } = this.props
        this.checkAnswer( userAnswers, questions, this.refs.timer.stop())
      }
    });
  }
  checkAnswer = async (answer, questions, time) => {
    this.setState({submitLoading: true})
    const result = questions.map((item, index) => {
      if (answer[index] === undefined || answer[index].length === 0) {
        return { questionId:item.id, success: false, title: item.title }
      }
      return { questionId:item.id, success: JSON.stringify(answer[index].sort()) === JSON.stringify(item.answers.sort()), title: item.title }
    })
    const {paperInfo} = this.props
    let saveParmas = {type: 1, data: result}
    if (paperInfo !== null) {
      saveParmas.type = 0
      const length = questions.length
      const correctRate = result.reduce((pre, cur) => cur.success ? (pre + (1 / length)) : pre, 0),
        paperSaveInfo = {paperId: paperInfo._id, title: paperInfo.title, time, correctRate: (correctRate*100).toFixed(2)}
      saveParmas = Object.assign({}, {paperSaveInfo}, saveParmas)
    }
    const {success} = (await RecordService.saveRecord(saveParmas)).data
    success ? {} : message.error('服务器发生了错误，此次做题记录未被保存成功！')
    this.setState({submitLoading: false})
    this.props.history.push({pathname: '/questions/analysis', state: { data: { answer, questions, time, result, paperInfo } }})
  }
  likeIt = async (id) => {
    this.setState({ likeIcon: 'loading' })
    const result = (await QuestionService.likeIt(id)).data
    this.setState({ likeIcon: 'smile-o' })
    if ( result.success ) {
      const { funLikeIt } = this.props
      funLikeIt(id)
      message.success(result.message)
    } else {
      message.warn(result.message)
    }
  }
  dislikeIt = async (id) => {
    this.setState({ dislikeIcon: 'loading' })
    const result = (await QuestionService.dislikeIt(id)).data
    this.setState({ dislikeIcon: 'frown-o' })
    if ( result.success ) {
      const {funDisLikeIt} = this.props
      funDisLikeIt(id)
      message.success(result.message)
    } else {
      message.warn(result.message)
    }
  }
  render () {
    const {questions} = this.props
    const { 
      currentQuestion,
      likeIcon,
      dislikeIcon,
      userAnswers,
      submitLoading} = this.state
    let options = [],
    answerSheet = {background: 'rgb(41, 189, 185)',color: 'white'},
    currentQues = questions[currentQuestion],
    userAnswer  = userAnswers[currentQuestion],
    ifAdvance   = true;
    document.title = currentQues.title;
    if ( userAnswer === undefined) {
      options = null
    } else {
      options = currentQues.type === 0 ? userAnswer[0] : userAnswer
    }
    if ( userAnswers.length !== questions.length ) {
      ifAdvance = false
    } else {
      for ( let i = 0; i < userAnswers.length; i++ ) {
        if (userAnswers[i] === undefined || userAnswers[i].length === 0) {
          ifAdvance = false
          break;
        }
      }
    }
    return (
      <section className="doQuestions-questions">
        <div className="doQuestions-questions-header">
          <div className="doQuestions-questions-header-left">
            <Progress strokeWidth={15} percent={((currentQuestion + 1)/questions.length * 100)} showInfo={false} />
            <span><font style={{color: '#28BEB8'}}>{currentQuestion + 1}</font>/{questions.length}</span>
          </div>
          <div className="doQuestions-questions-header-right">
            <Timer showButton={false} ref="timer" className="doQuestions-questions-header-timer"/>
          </div>
        </div>
        <div className="doQuestions-questions-content">
          <div className="doQuestions-questions-content-title">
            { currentQues.type === 0 ? '[单选题]' : '[多选题]' }
          </div>
          <div className="doQuestions-questions-content-content">
            <article><pre>{currentQues.title}</pre></article>
            {
              currentQues.type === 0 ? (
                <RadioGroup value={options} key={currentQues._id} onChange={(e) => this.setUserAnswer([e.target.value], currentQuestion)}>
                  {
                    currentQues.options.map((item, index) => <Radio key={index} value={item.value}>{item.label}</Radio>)
                  }
                </RadioGroup>
              ) : (
                <CheckboxGroup value={options} key={currentQues._id} onChange={(checkedValue) => this.setUserAnswer(checkedValue, currentQuestion)}>
                  {
                    currentQues.options.map((item, index) => <Checkbox  key={index} value={item.value}>{item.label}</Checkbox>)
                  }
                </CheckboxGroup>
              )
            }
          </div>
          <div className="doQuestions-questions-content-option">
              <div>
                <label>
                  <Icon type={likeIcon} onClick={() => {this.likeIt(currentQues._id)}}/>
                  <font>{ currentQues.like.length }</font>
                </label>
                <label>
                  <Icon type={dislikeIcon} onClick={() => {this.dislikeIt(currentQues._id)}}/>
                  <font>{ currentQues.dislike.length }</font>
                </label>
              </div>
              <div>
                {
                  ifAdvance 
                  ? <Button onClick={this.submit} loading={submitLoading}>交卷</Button> 
                  : <Button onClick={this.submitAdvance} loading={submitLoading}>提前交卷</Button> 
                }
                {
                  currentQuestion !== 0 ? <Button onClick={this.backQuestion} type="primary">上一题</Button> : null
                }
                {
                  currentQuestion !== (questions.length - 1) ? <Button onClick={this.nextQuestion} type="primary">下一题</Button> : null
                }
              </div>
          </div>
        </div>
        <div className="doQuestions-questions-content-answerSheet">
          <Collapse defaultActiveKey={['1']}>
            <Panel header="答题卡" key="1">
              {
                questions.map((item, index) => {
                  let style = {}
                  if (userAnswers[index] !== undefined && userAnswers[index].length !== 0) {
                    style = answerSheet
                  }
                  return <span onClick={() => { this.goToQuestion(index) }} style = {style} key={index}>{index + 1}</span>
                })
              }
            </Panel>
          </Collapse>
        </div>
      </section>
    )
  }
}

export default Questions