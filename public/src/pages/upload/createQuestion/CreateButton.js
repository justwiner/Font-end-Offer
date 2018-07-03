import React, { Component } from 'react'
import {Input, Button, Modal, message  } from 'antd'
import {QuestionService, Config} from '../../../lib'

class CreateButton extends Component {
  state = {
    visible: false,
    uploadLoading: false,
    questionLoading: false,
    paperLoading: false,
    paperTitle: ''
  }
  componentWillMount () {
    this.setState({ visible: this.props.visible })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ visible: nextProps.visible })
  }
  uploadPaper = async () => {
    const { paperTitle } = this.state
    const { questions } = this.props
    if ( paperTitle !== '' ) {
      this.setState({ paperLoading: true });
      const sortQuestions = this.sortQuestion(questions, true)
      const data = (await QuestionService.uploadQuestions(Object.assign({}, { battingType: true, title: paperTitle }, {data: sortQuestions}))).data
      if ( data.success ) {
        message.success(data.message)
        this.props.history.push('/upload/success')
      } else {
        message.error(data.message)
      }
      this.setState({ paperLoading: false });
    } else {
      message.warn('请输入试卷名！')
    }
  }
  uploadQuestion = async () => {
    const { questions } = this.props
    this.setState({ questionLoading: true });
    const sortQuestions = this.sortQuestion(questions, false)
    const data = (await QuestionService.uploadQuestions(Object.assign({}, { battingType: false }, {data: sortQuestions}))).data
      if ( data.success ) {
        message.success(data.message)
        this.props.history.push('/upload/success')
      } else {
        message.error(data.message)
      }
      this.setState({ questionLoading: false });
  }
  upload = async () => {
    const { questions } = this.props
    let msg= ''
    for ( let i = 0; i < questions.length; i++ ) {
      if ( questions[i].title === '' ) {
        msg = `第 ${i + 1} 题缺少题目描述，请正确填写信息。`
        message.error(msg)
        return
      }
      if ( questions[i].options.length < 2 ) {
        msg = `请确保第 ${i + 1} 题的选项数量大于等于2。`
        message.error(msg)
        return
      }
      if ( questions[i].answers.length === 0 ) {
        msg = `请确保第 ${i + 1} 题含有预设答案。`
        message.error(msg)
        return
      }
    }
    if ( questions.length >= Config.frontFamily.minPaperQuestionNum ) {
      this.showModal()
    } else {
      this.setState({ uploadLoading: true })
      const sortQuestions = this.sortQuestion(questions, false)
      const data = (await QuestionService.uploadQuestions(Object.assign({}, { battingType: false }, {data: sortQuestions}))).data
      data.success ? message.success(data.message) : message.error(data.message)
      this.setState({ uploadLoading: false })
      this.props.history.push('/upload/success')
    }
  }
  sortQuestion = (questions, battingType) => {
    if (battingType) {
      return questions.map((item, index) => {
        return Object.assign({}, { sort: index + 1 }, item)
      })
    } else {
      return questions.map((item, index) => {
        return Object.assign({}, { sort: -1 }, item)
      })
    }
  }
  showModal = () => this.setState({visible: true,});
  render () {
    const {AddQuestion, questions } = this.props
    const {uploadLoading, visible, questionLoading, paperLoading} = this.state
    return (
      <div className="createQuestion-create-button">
        <div>
          <Button onClick={() => AddQuestion(0)} icon="check-circle-o" size="large">单选题</Button>
          <Button onClick={() => AddQuestion(1)} type="primary" icon="check-square-o" size="large">多选题</Button>
          <font>共 <span style={{color: 'rgb(41, 189, 185)'}}>{questions.length}</span> 个题目</font>
        </div>
        <div>
        {
          questions.length !== 0 ? (<Button onClick={this.upload} loading={uploadLoading} icon="check" size="large">完成</Button>) : (<div/>)
        }
        <Modal
          visible={visible}
          title="选择上传方式"
          onCancel={() => { this.setState({ visible: false }) }}
          footer={[
            <Button key="back" loading={questionLoading} onClick={this.uploadQuestion}>
              批量上传
            </Button>,
            <Button key="submit" type="primary" loading={paperLoading} onClick={this.uploadPaper}>
              上传试卷
            </Button>,
          ]}
        >
          <p style={{letterSpacing: 'normal'}}>当上传的题目数量不低于{Config.frontFamily.minPaperQuestionNum}题时，。</p>
          <p style={{letterSpacing: 'normal'}}>若选择以试卷方式上传，请输入试卷名称。</p>
          <Input size="large" maxLength={15} onChange = { (e) => { this.setState({ paperTitle: e.target.value }) } } placeholder="请输入试卷名" />
        </Modal>
        </div>
      </div>
    )
  }
}

export default CreateButton