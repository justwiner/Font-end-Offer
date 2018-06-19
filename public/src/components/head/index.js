import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Dropdown, Menu, Icon} from 'antd'
import './index.scss'

class Foot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      currentMenu: '/'
    }
  }
  componentWillMount () {
    this.setState({currentMenu: window.location.pathname})
  }
  menuItems () {
    const {pathname} = this.state
    const menus = [
      {
        path: '/',
        title: '首页'
      },
      {
        path: '/questions',
        title: '题库'
      },
      {
        path: '/upload',
        title: '上传'
      },
      {
        path: '/about',
        title: '关于我们'
      }
    ]
    return (
      <ul>
        {
          menus.map((item, index) => {
            return this.ifCurrentMenu(pathname, item.path, item.title, index)
          })
        }
      </ul>
    )
  }
  ifCurrentMenu (pathname = window.location.pathname, path, title, key) {
    return pathname === path 
    ? <li onClick={this.changeMenu.bind(this, path)} key={key} style={{borderColor: '#29BDB9'}}><Link to={path}>{title}</Link></li> 
    : <li onClick={this.changeMenu.bind(this, path)} key={key}><Link to={path}>{title}</Link></li>
  }
  changeMenu (path) {
    this.setState({ currentMenu: path })
  }
  userMenus () {
    const style = {
      marginLeft: '1vw'
    }
    const menu = (
      <Menu>
        <Menu.Item>
          <Icon type="user" /><span style={style}>个人中心</span>
        </Menu.Item>
        <Menu.Item>
          <Icon type="logout" /><span style={style}>退出</span>
        </Menu.Item>
      </Menu>
    );
    return menu
  }
  render () {
    const { user } = this.state
    let style = {background: 'rgba(61,68,76,0.9)'}
    return (
      <header className="head" style={style}>
        <div>LOGO</div>
        {
          this.menuItems()
        }
        <div>
          {
            user === null ? (
              <div className="no-login">
                <span>登 录</span>
                <span>注 册</span>
              </div>
            ) : (
              <Dropdown overlay={this.userMenus()} placement="bottomLeft">
                <div className="login" title={user.name}>
                  <img src={user.img} alt="头像"/>
                  <span>{user.name}</span>
                </div>
              </Dropdown>
            )
          }
        </div>
      </header>
    )
  }
}

export default Foot