import React, {Component} from 'react'
import { message } from 'antd'
import {QuestionService} from '../../../lib'
import CreateTip from './CreateTip'
import CreateButton from './CreateButton'
import CreateQuestion from './CreateQuestion'

class CreateQuestions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: []
    }
  }
  async componentWillMount () {
    let { chapters } = this.props.question
    if (chapters.length === 0) {
      const hide = message.loading('正在获取分类..', 0);
      chapters = (await QuestionService.getChaptersN()).data.chapters
      hide()
      this.props.actions.setChapters(chapters)
    }
  }
  AddQuestion = type => {
    let { questions } = this.state
    if ( questions.length === 30 ) {
      message.error('最多同时上传30道题目。')
      return
    }
    const question = {
      type,
      title: '',
      options: [],
      answers: [],
      chapter: 0,
      difficultyLevel: 1
    }
    questions.push(question)
    this.setState({ questions })
  }
  deleteQuestion = index => {
    let { questions } = this.state
    questions.splice(index, 1)
    this.setState({ questions })
  }
  inputTitle = (e, index) => {
    let { questions } = this.state
    questions[index].title = e.target.value
    this.setState({ questions })
  }
  upQuestion = (index) => {
    if ( index === 0 ) {
      message.info('当前已经是第一题了！')
      return
    }
    let { questions } = this.state
    const temp = questions[index]
    questions[index] = questions[index - 1]
    questions[index - 1] = temp
    this.setState({ questions })
  }
  downQuestion = (index) => {
    let { questions } = this.state
    if ( index === questions.length - 1 ) {
      message.info('当前已经是最后一题了！')
      return
    }
    const temp = questions[index]
    questions[index] = questions[index + 1]
    questions[index + 1] = temp
    this.setState({ questions })
  }
  saveCheckbox = (checkedValues, index) => {
    let { questions } = this.state
    questions[index].answers = checkedValues
    this.setState({ questions })
  }
  showSelectDetail = index => {
    const detailInput = document.getElementById(`selection-detail-${index}`),
    status = detailInput.style.display;
    status === 'none' || status === '' ? detailInput.style.display = 'inline-block' : detailInput.style.display = 'none'
  }
  addOption = (e, index) => {
    let { questions } = this.state
    const value = e.target.value
    let { options } = questions[index]
    if ( options.length === 6 ) {
      message.warn('最多支持6个选项!')
      return
    }
    questions[index].options.push({ label: value, value: options.length })
    document.getElementById(`selection-detail-${index}`).value = ''
    this.showSelectDetail(index)
    this.setState({ questions })
  }
  deleteDownOption = (i) => {
    let { questions } = this.state
    const answers = questions[i].answers
    if ( questions[i].options.length !== 0 ) {
      const popOption = questions[i].options.pop()
      let index = -1;
      for (let i = 0; i < answers.length; i++) {
        if ( popOption.value === answers[i] ) {
          index = i
          break;
        }
      }
      index !== -1 ? questions[i].answers.splice(index, 1) : {};
      this.setState({ questions })
    } else {
      message.warn('你还未添加选项！')
    }
  }
  changeChapter = (value, index) => {
    let { questions } = this.state
    questions[index].chapter = value
    this.setState({questions})
  }
  changeDifficultyLevel = (value, index) => {
    let { questions } = this.state
    questions[index].difficultyLevel = value
    this.setState({questions})
  }
  render () {
    const {questions} = this.state;
    return (
      <section className="createQuestion">
        <article>创建问题</article>
        <CreateTip />
        <section className="createQuestion-create">
          {
            questions.map((item, index) => {
              return (
                <CreateQuestion 
                  key={index}
                  item={item}
                  index={index}
                  deleteQuestion={this.deleteQuestion}
                  upQuestion={this.upQuestion}
                  downQuestion={this.downQuestion}
                  inputTitle={this.inputTitle}
                  saveCheckbox={this.saveCheckbox}
                  showSelectDetail={this.showSelectDetail}
                  deleteDownOption={this.deleteDownOption}
                  changeDifficultyLevel={this.changeDifficultyLevel}
                  changeChapter={this.changeChapter}
                  addOption={this.addOption}
                  {...this.props}/>
              )
            })
          }
          <CreateButton {...this.props} AddQuestion = {this.AddQuestion} questions = {questions}/>
        </section>
      </section>
    )
  }
}

export default CreateQuestions