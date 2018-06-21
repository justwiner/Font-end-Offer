import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Dropdown, Menu, Icon, Modal, Button, Input} from 'antd'
import './index.scss'

class Foot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentMenu: '/',
      visible: false,
      confirmLoading: false,
      account: '',
      password: '',
      key: 1
    }
  }
  componentWillMount = () => {
    this.setState({currentMenu: window.location.pathname})
    console.log(this.props.user)
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
    return pathname === path 
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
        <Menu.Item onClick={() => this.props.actions.logout()}>
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
  handleOk = () => {
    const { account, password } = this.state
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      console.log(this.props)
      this.props.actions.login({ account, password })
      this.setState({
        confirmLoading: false,
      })
      this.handleCancel()
    }, 2000);
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      account: '',
      password: '',
      key: Math.random()
    })
  }

  inputAccount = e => {
    this.setState({ account: e.target.value })
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
            user.token === null ? (
              <div className="no-login">
                <span onClick={this.showModal}>登 录</span>
                <span>注 册</span>
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
          <p><Input size="large" onChange={this.inputAccount} placeholder="请输入邮箱" /></p>
          <br/>
          <p><Input size="large" type="password" onChange={this.inputPassword} placeholder="请输入密码" /></p>
        </Modal>
      </header>
    )
  }
}

export default Foot