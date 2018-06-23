import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Dropdown, Menu, Icon, Modal, Input, message} from 'antd'
import {Service} from '../../lib'
import './index.scss'

class Head extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentMenu: '/',
      visible: false,
      confirmLoading: false,
      eMail: '',
      password: '',
      key: 1
    }
  }
  componentWillMount = () => {
    this.setState({currentMenu: window.location.pathname})
  }
  menuItems = () => {
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
  ifCurrentMenu = (pathname = window.location.pathname, path, title, key) => {
    let result = false
    if (pathname === path) {
      result = true
    } else {
      if ( path !== '/' &&  pathname.indexOf(path) >= 0 ) {
        result = true
      }
    }
    return result
    ? <li onClick={this.changeMenu.bind(this, path)} key={key} style={{borderColor: '#29BDB9'}}><Link to={path}>{title}</Link></li> 
    : <li onClick={this.changeMenu.bind(this, path)} key={key}><Link to={path}>{title}</Link></li>
  }
  changeMenu = (path) => {
    this.setState({ currentMenu: path })
  }
  userMenus = () => {
    const style = {
      marginLeft: '1vw'
    }
    const menu = (
      <Menu>
        <Menu.Item>
          <Icon type="user" /><span style={style}>个人中心</span>
        </Menu.Item>
        <Menu.Item onClick={() => {this.props.actions.logout();window.location.href='/'}}>
          <Icon type="logout" /><span style={style}>退出</span>
        </Menu.Item>
      </Menu>
    );
    return menu
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = async () => {
    const { eMail, password } = this.state
    this.setState({confirmLoading: true});
    const data = (await Service.login({ eMail, password })).data
    if (data.success) {
      message.success(data.message)
      this.props.actions.login(data)
      this.handleCancel()
    } else {
      message.error(data.message)
    }
    this.setState({confirmLoading: false})
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      eMail: '',
      password: '',
      key: Math.random()
    })
  }

  inputeMail = e => {
    this.setState({ eMail: e.target.value })
  }
  inputPassword = e => {
    this.setState({ password: e.target.value })
  }
  render () {
    const { user } = this.props
    const { visible, confirmLoading, key } = this.state
    let style = {background: 'rgba(61,68,76,0.9)'}
    return (
      <header className="head" style={style}>
        <div>LOGO</div>
        {
          this.menuItems()
        }
        <div>
          {
            user.avatar === null || user.avatar === undefined || user.avatar === '' ? (
              <div className="no-login">
                <span onClick={this.showModal}>登 录</span>
                <Link to="/register"><span>注 册</span></Link>
              </div>
            ) : (
              <Dropdown overlay={this.userMenus()} placement="bottomLeft">
                <div className="login" title={user.name}>
                  <img src={user.avatar} alt="头像"/>
                  <span>{user.nickName}</span>
                </div>
              </Dropdown>
            )
          }
        </div>
        <Modal title="登录"
          wrapClassName="login-center-modal"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          cancelText="取消登录"
          okText="确认登录"
          key={key}
        >
          <p><Input size="large" autoComplete="email" onChange={this.inputeMail} placeholder="请输入邮箱" /></p>
          <br/>
          <p><Input size="large" autoComplete="new-password" type="password" onChange={this.inputPassword} placeholder="请输入密码" /></p>
        </Modal>
      </header>
    )
  }
}

export default Head