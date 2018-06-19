import React, { Component } from 'react'
import {Link} from 'react-router-dom'
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
        title: '上传高质量题目'
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
  render () {
    const { user } = this.state
    return (
      <header className="head" style={{background: 'rgba(61,68,76,0.9)'}}>
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
              <div>
                <span>{user.name}</span>
              </div>
            )
          }
        </div>
      </header>
    )
  }
}

export default Foot