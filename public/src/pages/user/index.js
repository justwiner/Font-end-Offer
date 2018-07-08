import React,{ Component } from 'react'
import {Icon,message} from 'antd'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import UserInfo from './userInfo/UserInfo'
import ChangePass from './ChangePass'
import {Avatar} from '../../components'
import {UserService} from '../../lib'
import './index.scss'

class User extends Component {
  state = {
    currentMenu: '/user',
    menu: [
      {
        id: 1,
        idcon: 'home',
        title: '首页',
        path: '/user'
      },
      {
        id: 2,
        idcon: 'user',
        title: '个人信息',
        path: '/user/info'
      },
      {
        id: 3,
        idcon: 'key',
        title: '修改密码',
        path: '/user/pass'
      }
    ]
  }
  componentWillMount () {
    if (this.props.user.avatar === '') {
      message.warn('请登录之后，再进入个人中心！')
      this.props.history.push('/')
    }
    document.title = '个人中心'
    this.setState({ currentMenu: window.location.pathname })
  }
  setCurrentMenu = (path) => {
    this.setState({ currentMenu: path })
  }
  onChange = async (value) => {
    const loading = message.loading('头像上传中....',0)
    const result = (await UserService.modifyAvatar({ avatar: value })).data
    loading()
    if (result.success) {
      message.success(result.message)
      this.props.actions.modifyUser(this.props.user.nickName, result.avatar)
    } else {
      message.error(result.message)
    }
  }
  render () {
    const {menu, currentMenu} = this.state
    const {user} = this.props
    return (
      <section className="userInfo">
        <section className="userInfo-left">
          <section className="userInfo-left-header">
            <p>Front Family</p>
            <p>
              <Avatar 
                url= {user.avatar}
                border={true}
                onChange={this.onChange}
                size="6vw"/>
            </p>
            <p><font>{user.nickName}</font></p>
          </section>
          <section className="userInfo-left-menu">
            <ul>
              {
                menu.map((item, index) => {
                  let style = {}
                  if ( currentMenu === item.path ) {
                    style = {
                      borderLeftColor: 'rgb(41, 189, 185)',
                      color: '#63737a'
                    }
                  }
                  return (
                    <Link key={index} to={item.path}>
                      <li 
                        style= {style}
                        onClick={() => this.setCurrentMenu(item.path)}>
                        <Icon type={item.icon} />{item.title}
                      </li>
                    </Link>
                  )
                })
              }
            </ul>
          </section>
        </section>
        <section className="userInfo-right">
          <Route exact path="/user" render={() => <Home />} />
          <Route exact path="/user/info" render={() => <UserInfo {...this.props} />} />
          <Route exact path="/user/pass" render={() => <ChangePass {...this.props} />} />
        </section>
      </section>
    )
  }
}

export default User