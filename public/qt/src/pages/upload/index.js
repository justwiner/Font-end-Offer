import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {message} from 'antd'
import ChooseType from './ChooseType'
import CreateQuestions from'./createQuestion'
import CreateSuccess from './CreateSuccess'
import './index.scss'

class Upload extends Component {
  componentWillMount () {
    const { user } = this.props
    if (user.avatar === undefined || user.avatar === null || user.avatar === "") {
      this.props.history.goBack()
      message.error('请先登录过后，再进行该操作！')
    }
    document.title = '上传问题'
  }
  render () {
    return (
      <section className="upload">
        <Route exact path="/upload" render={() => <ChooseType/>}/>
        <Route exact path="/upload/question" render={() => <CreateQuestions {...this.props} />}/>
        <Route exact path="/upload/success" render={() => <CreateSuccess {...this.props} />}/>
      </section>
    )
  }
}

export default Upload