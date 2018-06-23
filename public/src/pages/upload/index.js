import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {message} from 'antd'
import ChooseType from './ChooseType'
import './index.scss'

class Upload extends Component {
  componentWillMount () {
    const { user } = this.props
    if (user.avatar === undefined || user.avatar === null || user.avatar === "") {
      this.props.history.goBack()
      message.error('请先登录过后，再进行该操作！')
    }
  }
  render () {
    return (
      <section className="upload">
        <Route exact path="/upload" render={() => <ChooseType />}/>
        <Route exact path="/upload/question" render={() => <div>创建试题</div>}/>
        <Route exact path="/upload/paper" render={() => <div>创建试卷</div>}/>
      </section>
    )
  }
}

export default Upload