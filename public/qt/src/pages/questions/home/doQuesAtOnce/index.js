import React, { Component } from 'react'
import iconPic from '../../../../asset/doQuestionAtOnce.png'
import {Affix, Tooltip, message } from 'antd'
import FastDoQuestionModal from '../../fastDoQuestionModal'
import './index.scss'

class DoQuesAtOnce extends Component {
  state = { 
    visible: false
  }
  showModal = () => {
    const { user } = this.props
    if ( user.avatar === '' ) {
      message.warn('请先登录！',2)
      return
    }
    this.setState({ visible: true })
  }

  render () {
    return (
      <Affix offsetTop={130}>
        <div className="doQuestionAtOnce">
          <Tooltip placement="left" title="快速出题">
            <img onClick={this.showModal} src={iconPic} alt="立即做题" />
          </Tooltip>
          <FastDoQuestionModal visible={this.state.visible} { ...this.props }/>
        </div>
      </Affix>
    )
  }
}

export default DoQuesAtOnce