import React,{Component} from 'react'
import {Button} from 'antd'
import moment from 'moment'

class Show extends Component {
  handleClick = () => {
    document.getElementById('showUserInfo').style.display = 'none'
    document.getElementById('modifyUserInfo').style.display = 'block'
  }
  render () {
    const {user} = this.props
    return (
      <section id="showUserInfo" className="userInfo-right-info-content">
        <dl>
          <dt>我的昵称</dt>
          <dd>{user.nickName}</dd>
        </dl>
        <dl>
          <dt>我的邮箱</dt>
          <dd>{user.eMail}</dd>
        </dl>
        <dl>
          <dt>加入日期</dt>
          <dd>{moment(user.createAt).format('YYYY-MM-DD HH:mm:ss')}</dd>
        </dl>
        <dl>
          <dt>我的性别</dt>
          <dd>{user.gender}</dd>
        </dl>
        <dl>
          <dt>居住地</dt>
          <dd>{user.address}</dd>
        </dl>
        <dl>
          <dt>学历</dt>
          <dd>{user.education}</dd>
        </dl>
        <dl>
          <dt>毕业年份</dt>
          <dd>{user.graduateTime}</dd>
        </dl>
        <dl>
          <dt>我的学校</dt>
          <dd>{user.school}</dd>
        </dl>
        <dl>
          <dt>我的目标公司</dt>
          <dd>{user.expecteCompany}</dd>
        </dl>
        <dl><dt><Button onClick={this.handleClick} type="primary">修改信息</Button></dt></dl>
      </section>
    )
  }
}

export default Show