import React, { Component } from 'react'
import { Radio, Icon, Button, Progress, Checkbox, Collapse, Modal, message } from 'antd';
import {QuestionService} from '../../../lib'
import {Timer}  from '../../../components'
import './index.scss'
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;

class DoQuestion extends Component {
  state = {
    paperInfo: null,
    questions: [],
    currentQuestion: 0,
    userAnswers: [],
    likeIcon: 'smile-o',
    dislikeIcon: 'frown-o',
    result: [],
    time: null
  }
  async componentWillMount () {
    const data = this.props.location.state;
    if (data.type === 0) {
      this.setState({ questions: data.data })
    } else {
      const loading = message.loading("正在获取试题列表...", 0)
      const {questions, createAt, createBy, difficultyLevel, like, dislike, title} = data.data
      this.setState({ paperInfo: { createAt, createBy, difficultyLevel, like, dislike, title } })
      const result = (await QuestionService.getQuestionsByIds(questions)).data
      loading()
      if ( result.success ) {
        this.setState({ questions: result.questions })
      } else {
        message.error(result.message)
      }
    }
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
    const { userAnswers, questions } = this.state
    this.checkAnswer( userAnswers, questions, this.refs.timer.stop())
  }
  submitAdvance = () => {
    confirm({
      title: '确定提前交卷?',
      content: '你还有一些题目没有完成，详情请看答题卡。',
      okText: '确定提前交卷',
      cancelText: '不，我点错了',
      onOk: () => {
        const { userAnswers, questions } = this.state
        this.checkAnswer( userAnswers, questions, this.refs.timer.stop())
      }
    });
  }
  checkAnswer = (answer, questions, time) => {
    const result = questions.map((item, index) => {
      if (answer[index] === undefined || answer[index].length === 0) {
        return false
      }
      return JSON.stringify(answer[index].sort()) === JSON.stringify(item.answers.sort())
    })
    const {paperInfo} = this.state
    this.props.history.push({pathname: '/questions/analysis', state: { data: { answer, questions, time, result, paperInfo } }})
  }
  likeIt = async (id) => {
    this.setState({ likeIcon: 'loading' })
    const result = (await QuestionService.likeIt(id)).data
    this.setState({ likeIcon: 'smile-o' })
    if ( result.success ) {
      const {questions} = this.state
      questions[questions.findIndex(e => e._id === id)].like.push('temp')
      this.setState({ questions })
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
      const {questions} = this.state
      questions[questions.findIndex(e => e._id === id)].dislike.push('temp')
      this.setState({ questions })
      message.success(result.message)
    } else {
      message.warn(result.message)
    }
  }
  render () {
    const { 
      currentQuestion, 
      questions, 
      userAnswers, 
      likeIcon, 
      dislikeIcon,
      paperInfo } = this.state
    const { difficultyLevels } =this.props.question
    let options = [],
    answerSheet = {background: 'rgb(41, 189, 185)',color: 'white'},
    ifAdvance   = true;
    if ( userAnswers[currentQuestion] === undefined) {
      options = null
    } else {
      options = questions[currentQuestion].type === 0 ? userAnswers[currentQuestion][0] : userAnswers[currentQuestion]
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
    let difficultStyle = {}
    if (paperInfo !== null) {
      switch (paperInfo.difficultyLevel) {
        case 1: difficultStyle = { color: '#73d13d' } ;break;
        case 2: difficultStyle = { color: '#1890ff' } ;break;
        case 3: difficultStyle = { color: '#ff4d4f' } ;break;
      }
    }
    return (
      <section className="doQuestions">
        {
          paperInfo !== null ? (
            <section className="doQuestions-papersInfo">
              <div><img src={paperInfo.createBy.avatar} alt="贡献者头像" /></div>
              <div>
                <article>{paperInfo.title}</article>
                <p>
                  <label>贡献者</label>:
                  <font>{paperInfo.createBy.nickName}</font>
                </p>
                <p>
                  <label>创建时间</label>:
                  <font>{paperInfo.createAt}</font>
                </p>
                <p>
                  <label>题目数</label>:
                  <font>{questions.length}</font>
                </p>
                <p>
                  <label>难度</label>:
                  <font style={difficultStyle}>{difficultyLevels[difficultyLevels.findIndex(e => e.id === paperInfo.difficultyLevel)].title}</font>
                </p>
              </div>
            </section>
          ) : <section></section>
        }
        {
          questions.length !== 0 ? (
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
                  { questions[currentQuestion].type === 0 ? '[单选题]' : '[多选题]' }
                </div>
                <div className="doQuestions-questions-content-content">
                  <article>{questions[currentQuestion].title}</article>
                  {
                    questions[currentQuestion].type === 0 ? (
                      <RadioGroup value={options} key={questions[currentQuestion]._id} onChange={(e) => this.setUserAnswer([e.target.value], currentQuestion)}>
                        {
                          questions[currentQuestion].options.map((item, index) => <Radio key={index} value={item.value}>{item.label}</Radio>)
                        }
                      </RadioGroup>
                    ) : (
                      <CheckboxGroup value={options} key={questions[currentQuestion]._id} onChange={(checkedValue) => this.setUserAnswer(checkedValue, currentQuestion)}>
                        {
                          questions[currentQuestion].options.map((item, index) => <Checkbox  key={index} value={item.value}>{item.label}</Checkbox>)
                        }
                      </CheckboxGroup>
                    )
                  }
                </div>
                <div className="doQuestions-questions-content-option">
                    <div>
                      <label>
                        <Icon type={likeIcon} onClick={() => {this.likeIt(questions[currentQuestion]._id)}}/>
                        <font>{ questions[currentQuestion].like.length }</font>
                      </label>
                      <label>
                        <Icon type={dislikeIcon} onClick={() => {this.dislikeIt(questions[currentQuestion]._id)}}/>
                        <font>{ questions[currentQuestion].dislike.length }</font>
                      </label>
                    </div>
                    <div>
                      {
                        ifAdvance 
                        ? <Button onClick={this.submit}>交卷</Button> 
                        : <Button onClick={this.submitAdvance}>提前交卷</Button> 
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
          ) : (<section>无数据</section>)
        }
      </section>
    )
  }
}

export default DoQuestion