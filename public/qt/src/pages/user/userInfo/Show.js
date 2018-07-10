import React,{Component} from 'react'
import {Button} from 'antd'
import moment from 'moment'
import schoolList from '../../../asset/chinaUniversityList'

class Show extends Component {
  handleClick = () => {
    document.getElementById('showUserInfo').style.display = 'none'
    document.getElementById('modifyUserInfo').style.display = 'block'
  }
  getGender = id => {
    switch (id) {
      case 1: return '男' ;
      case 2: return '女' ;
      default: return ''
    }
  }
  getEducation = id => {
    switch (id) {
      case 1: return '小学' ;
      case 2: return '初中' ;
      case 3: return '高中' ;
      case 4: return '专科' ;
      case 5: return '本科' ;
      case 6: return '硕士' ;
      case 7: return '博士' ;
      case 8: return '博士后' ;
      default: return ''
    }
  }
  getSchool = ids => {
    let schoolStr = ''
    if (!ids) return schoolStr
    for (let i = 0; i < schoolList.length; i++) {
      if (schoolList[i].id === ids[0]) {
        for (let j = 0; j < schoolList[i].school.length; j++) {
          if ( schoolList[i].school[j].id === ids[1] ) {
            schoolStr = `${schoolList[i].name} - ${schoolList[i].school[j].name}`
            break;
          }
        }
      }
    }
    return schoolStr
  }
  render () {
    const {_user} = this.props
    return (
      <section id="showUserInfo" className="userInfo-right-info-content">
        <dl>
          <dt>我的昵称</dt>
          <dd>{_user.nickName}</dd>
        </dl>
        <dl>
          <dt>我的邮箱</dt>
          <dd>{_user.eMail}</dd>
        </dl>
        <dl>
          <dt>加入日期</dt>
          <dd>{moment(_user.createAt).format('YYYY-MM-DD HH:mm:ss')}</dd>
        </dl>
        <dl>
          <dt>我的性别</dt>
          <dd>{ this.getGender(_user.gender)}</dd>
        </dl>
        <dl>
          <dt>居住地</dt>
          <dd>{_user.address}</dd>
        </dl>
        <dl>
          <dt>学历</dt>
          <dd>{this.getEducation(_user.education)}</dd>
        </dl>
        <dl>
          <dt>毕业年份</dt>
          <dd>{_user.graduateTime}</dd>
        </dl>
        <dl>
          <dt>我的学校</dt>
          <dd>{this.getSchool(_user.school)}</dd>
        </dl>
        <dl>
          <dt>我的目标公司</dt>
          <dd>{_user.expecteCompany}</dd>
        </dl>
        <dl><dt><Button onClick={this.handleClick} type="primary">修改信息</Button></dt></dl>
      </section>
    )
  }
}

export default Show