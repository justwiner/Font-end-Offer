import React, { Component } from 'react'
import {UserService} from '../../../lib'
import { message } from 'antd'
import Show from './Show'
import Modify from './Modify'

class UserInfo extends Component {
  state = {
    user: {}
  }
  async componentWillMount () {
    const loading = message.loading('获取用户信息...', 0)
    const result = (await UserService.userInfo()).data
    loading()
    if (result.success) {
      this.setState({ user: result.user })
    } else {
      message.error(result.message)
    }
  }
  render () {
    const { user } = this.state
    return (
      <section className="userInfo-right-info">
        <article className="userInfo-right-info-title">个人信息</article>
        <Show user = {user} />
        <Modify user = {user} />
      </section>
    )
  }
}

export default UserInfo