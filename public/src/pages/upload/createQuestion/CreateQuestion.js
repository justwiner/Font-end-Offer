import React, { Component } from 'react'
import {Input, Icon, Checkbox, Tooltip, Radio, Select  } from 'antd'
const { TextArea } = Input;
const Option = Select.Option;

class CreateQuestion extends Component {
  render () {
    const {
      deleteQuestion, 
      index, 
      upQuestion, 
      downQuestion, 
      item, 
      inputTitle,
      showSelectDetail,
      deleteDownOption,
      changeDifficultyLevel,
      changeChapter,
      addOption,
      saveCheckbox} = this.props;
    const {difficultyLevels, chapters} = this.props.question,
      difficultyLevelsC = difficultyLevels.filter(e => e.id !== 0)
    return (
      <div className="createQuestion-create-section">
        <div className="create-close">
          <Icon onClick={() => { deleteQuestion(index) }} type="close" />
        </div>
        <div className="create-content">
          <div className="create-upAndDown">
            <Icon type="up" onClick={() => { upQuestion(index) }} />
            <span>第 {index + 1} 题</span>
            <Icon type="down" onClick={() => { downQuestion(index) }} />
          </div>
          {
            item.title === '' 
            ? <TextArea maxLength='200' onChange={(e) => { inputTitle(e, index) }} size="large" placeholder="请输入问题描述" /> 
            : <TextArea maxLength='200' onChange={(e) => { inputTitle(e, index) }} size="large" value={item.title} placeholder="请输入问题描述" />
          }
          <div className="create-selection">
            {
              item.type === 0 
              ? (
                <Radio.Group value={item.answers[0]} style={{ width: '100%' }} onChange={(e) => { saveCheckbox([e.target.value], index) }}>
                  {
                    item.options.map((e, i) => {
                      return (
                        <Radio key={i} value={e.value}>{e.label}</Radio>
                      )
                    })
                  }
                  <Tooltip placement="top" title="添加选项">
                    <Icon onClick={() => showSelectDetail(index)} type="plus-square-o" />
                  </Tooltip>
                  <Tooltip placement="top" title="删除最下方的选项">
                    <Icon onClick={() => deleteDownOption(index)} style={{marginLeft: '1vw'}} type="minus-square-o" />
                  </Tooltip>
                </Radio.Group>
              )
              : (
                <Checkbox.Group value={item.answers} style={{ width: '100%' }} onChange={(checkedValues) => { saveCheckbox(checkedValues, index) }}>
                  {
                    item.options.map((e, i) => {
                      return (
                        <Checkbox key={i} value={e.value}>{e.label}</Checkbox>
                      )
                    })
                  }
                  <Tooltip placement="top" title="添加选项">
                    <Icon onClick={() => showSelectDetail(index)} type="plus-square-o" />
                  </Tooltip>
                  <Tooltip placement="top" title="删除最下方的选项">
                    <Icon onClick={() => deleteDownOption(index)} style={{marginLeft: '1vw'}} type="minus-square-o" />
                  </Tooltip>
                </Checkbox.Group>
              )
            }
            <Input maxLength="100" id={`selection-detail-${index}`} onPressEnter={(e) => { addOption(e, index) }} className="selection-detail" placeholder="请输入选项描述" />
            <div className="selection-selector">
              <div>
                <span>分类: </span>
                <Select value={item.chapter} onChange={(value) => changeChapter(value, index)} placeholder="请选择分类" style={{ width: '15vw', marginRight: '2vw'}}>
                  {
                    chapters.map((chap, index) => <Option key={index} value={chap.id}>{chap.title}</Option>)
                  }
                </Select>
              </div>
              <div>
              <span>难度: </span>
                <Select value={item.difficultyLevel} onChange={(value) => changeDifficultyLevel(value, index)} placeholder="请选择难度" style={{ width: '7vw'}}>
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
  }
}

export default CreateQuestion