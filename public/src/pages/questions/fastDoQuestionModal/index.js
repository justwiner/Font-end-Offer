import React, { Component } from 'react'
import {Modal, Select, InputNumber, message} from 'antd'
import {QuestionService} from '../../../lib'
const Option = Select.Option;

class FastDoQuestionModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: this.props.visible,
      currentChapter: [],
      currentDifficults: [],
      questionNum: 10
    }
  }
  componentWillMount () {
    this.setState({ visible: this.props.visible })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ visible: nextProps.visible })
  }
  handleCancel = () => this.setState({ visible: false })
  getChapters = (value) => this.setState({ currentChapter: value })
  getdifficultyLevels = (value) => this.setState({ currentDifficults: value })
  getQuestionNum = (value) => this.setState({ questionNum: value })
  handleOk = async () => {
    const {currentChapter, currentDifficults, questionNum} = this.state
    if (currentChapter.length === 0 || currentDifficults.length === 0) {
      message.warn('请选择需要测试的知识点，与问题难度', 3)
      return
    }
    const loading = message.loading("正在为你生成试卷...", 0)
    const data = (await QuestionService.doQuesAtOnce({currentChapter, currentDifficults, questionNum})).data
    loading()
    if (data.success) {
      if ( data.questions.length === 0 ) {
        message.warn('暂时未发现此类型的题目...')
        return
      }
      message.success(data.message, 2)
      this.setState({
        visible: false,
      });
      this.props.history.push({ pathname: '/questions/do', state: { data: data.questions, type: 0 } })
    } else {
      message.error(data.message, 2)
    }
  }
  render () {
    const { chapters, difficultyLevels } = this.props.question,
      chaptersOption = chapters.map(item => {
        return <Option key={item.id}>{item.title}</Option>
      }),
      difficultyLevelsOption = difficultyLevels.map(item => {
        return <Option key={item.id}>{item.title}</Option>
      });
    return (
      <Modal
        title="快速出题"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        className="doQuestionAtOnce-modal"
        okText="开始"
        cancelText="取消"
      >
        <Select
          mode="multiple"
          style={{ width: '100%', margin: '1vw 0' }}
          placeholder="请选择知识点"
          onChange={this.getChapters}
        >
          {chaptersOption}
        </Select>
        <Select
          mode="multiple"
          style={{ width: '100%', margin: '1vw 0 2vw 0' }}
          placeholder="请选择难度"
          onChange={this.getdifficultyLevels}
        >
          {difficultyLevelsOption}
        </Select>
        <InputNumber min={1} max={30} defaultValue={this.state.questionNum} onChange={this.getQuestionNum} />
      </Modal>
    )
  }
}

export default FastDoQuestionModal