import React, {Component} from 'react'
import {Input, Button, Icon, message, Checkbox, Tooltip, Radio, Modal, Select  } from 'antd'
import {QuestionService} from '../../lib'
const { TextArea } = Input;
const Option = Select.Option;

class CreateQuestions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: [],
      questionLoading: false,
      paperLoading: false,
      uploadLoading: false,
      visible: false,
      paperTitle: ''
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
  upload = async () => {
    const { questions } = this.state
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
    if ( questions.length >= 2 ) {
      this.showModal()
    } else {
      this.setState({ uploadLoading: true })
      const sortQuestions = this.sortQuestion(questions, false)
      console.log(Object.assign({}, { battingType: false }, {data: sortQuestions}))
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
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  uploadPaper = async () => {
    const { questions, paperTitle } = this.state
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
    const { questions } = this.state
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
  renderTip = () => {
    return (
      <section className="createQuestion-tip">
          <p>1. 上传的题目应属于
            <font className="createQuestion-tip-stress">JavaScript</font>
            的范畴。
          </p>
          <p>2. 题目内容不包含
            <font className="createQuestion-tip-stress">敏感词汇</font>
            与
            <font className="createQuestion-tip-stress">不良思想</font>
            。
          </p>
          <p>3. 题目所属分类应确切
            <font className="createQuestion-tip-stress">认真</font>
            地选择。
          </p>
          <p>4. 若被检测出题目不属于
            <font className="createQuestion-tip-stress">JavaScript</font>
            的相关问题，或题目是被人
            <font className="createQuestion-tip-stress">恶意创建</font>
            ，或社区用户
            <font className="createQuestion-tip-stress">均反感与不喜欢</font>
            此问题，管理员将
            <font className="createQuestion-tip-stress">永久删除</font>
            此问题，并
            <font className="createQuestion-tip-stress">扣除</font>
            此用户的
            <font className="createQuestion-tip-stress">信誉值</font>
            。
          </p>
          <p>希望大家共同营造良好的 Front Family 社区，大家共同进步！</p>
        </section>
    )
  }
  render () {
    const {questions, questionLoading, paperLoading, uploadLoading, visible} = this.state,
          {difficultyLevels, chapters} = this.props.question,
          difficultyLevelsC = difficultyLevels.filter(e => e.id !== 0)
    return (
      <section className="createQuestion">
        <article>创建问题</article>
        { this.renderTip() }
        <section className="createQuestion-create">
          {
            questions.map((item, index) => {
              return (
                <div key= {index} className="createQuestion-create-section">
                  <div className="create-close"><Icon onClick={() => { this.deleteQuestion(index) }} type="close" /></div>
                  <div className="create-content">
                    <div className="create-upAndDown">
                      <Icon type="up" onClick={() => { this.upQuestion(index) }} />
                      <span>第 {index + 1} 题</span>
                      <Icon type="down" onClick={() => { this.downQuestion(index) }} />
                    </div>
                    {
                      item.title === '' 
                      ? <TextArea maxLength='200' onChange={(e) => { this.inputTitle(e, index) }} size="large" placeholder="请输入问题描述" /> 
                      : <TextArea maxLength='200' onChange={(e) => { this.inputTitle(e, index) }} size="large" value={item.title} placeholder="请输入问题描述" />
                    }
                    <div className="create-selection">
                      {
                        item.type === 0 
                        ? (
                          <Radio.Group value={item.answers[0]} style={{ width: '100%' }} onChange={(e) => { this.saveCheckbox([e.target.value], index) }}>
                            {
                              item.options.map((e, i) => {
                                return (
                                  <Radio key={i} value={e.value}>{e.label}</Radio>
                                )
                              })
                            }
                            <Tooltip placement="top" title="添加选项">
                              <Icon onClick={() => this.showSelectDetail(index)} type="plus-square-o" />
                            </Tooltip>
                            <Tooltip placement="top" title="删除最下方的选项">
                              <Icon onClick={() => this.deleteDownOption(index)} style={{marginLeft: '1vw'}} type="minus-square-o" />
                            </Tooltip>
                          </Radio.Group>
                        )
                        : (
                          <Checkbox.Group value={item.answers} style={{ width: '100%' }} onChange={(checkedValues) => { this.saveCheckbox(checkedValues, index) }}>
                            {
                              item.options.map((e, i) => {
                                return (
                                  <Checkbox key={i} value={e.value}>{e.label}</Checkbox>
                                )
                              })
                            }
                            <Tooltip placement="top" title="添加选项">
                              <Icon onClick={() => this.showSelectDetail(index)} type="plus-square-o" />
                            </Tooltip>
                            <Tooltip placement="top" title="删除最下方的选项">
                              <Icon onClick={() => this.deleteDownOption(index)} style={{marginLeft: '1vw'}} type="minus-square-o" />
                            </Tooltip>
                          </Checkbox.Group>
                        )
                      }
                      <Input maxLength="100" id={`selection-detail-${index}`} onPressEnter={(e) => { this.addOption(e, index) }} className="selection-detail" placeholder="请输入选项描述" />
                      <div className="selection-selector">
                        <div>
                          <span>分类: </span>
                          <Select value={item.chapter} onChange={(value) => this.changeChapter(value, index)} placeholder="请选择分类" style={{ width: '15vw', marginRight: '2vw'}}>
                            {
                              chapters.map((chap, index) => <Option key={index} value={chap.id}>{chap.title}</Option>)
                            }
                          </Select>
                        </div>
                        <div>
                        <span>难度: </span>
                          <Select value={item.difficultyLevel} onChange={(value) => this.changeDifficultyLevel(value, index)} placeholder="请选择难度" style={{ width: '7vw'}}>
                          {
                            difficultyLevelsC.map((dif, index) => <Option key={index} value={dif.id}>{dif.title}</Option>)
                          }
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <div className="createQuestion-create-button">
            <div>
              <Button onClick={() => this.AddQuestion(0)} icon="check-circle-o" size="large">单选题</Button>
              <Button onClick={() => this.AddQuestion(1)} type="primary" icon="check-square-o" size="large">多选题</Button>
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
              <p style={{letterSpacing: 'normal'}}>当上传的题目数量大于15题时，。</p>
              <p style={{letterSpacing: 'normal'}}>若选择以试卷方式上传，请输入试卷名称。</p>
              <Input size="large" maxLength={15} onChange = { (e) => { this.setState({ paperTitle: e.target.value }) } } placeholder="请输入试卷名" />
            </Modal>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default CreateQuestions