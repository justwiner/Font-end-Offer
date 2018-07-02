import React,{ Component } from 'react'
import {Icon} from 'antd'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import UserInfo from './UserInfo'
import ChangePass from './ChangePass'
import './index.scss'

class User extends Component {
  state = {
    user: {
      nickName: 'winer',
      eMail: '392110917@qq.com',
      avatar: 'http://tx.haiqq.com/uploads/allimg/170504/0U1292143-9.jpg'
    },
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
    this.setState({ currentMenu: window.location.pathname })
  }
  setCurrentMenu = (path) => {
    this.setState({ currentMenu: path })
  }
  render () {
    const {user, menu, currentMenu} = this.state
    return (
      <section className="userInfo">
        <section className="userInfo-left">
          <section className="userInfo-left-header">
            <p>Front Family</p>
            <p><img src={user.avatar} alt="用户头像" /></p>
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
          <Route exact path="/user/info" render={() => <UserInfo />} />
          <Route exact path="/user/pass" render={() => <ChangePass />} />
        </section>
      </section>
    )
  }
}

export default User