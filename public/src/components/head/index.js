import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Dropdown, Menu, Icon, Modal, Button} from 'antd'
import './index.scss'

class Foot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentMenu: '/',
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
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
        <Menu.Item>
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
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('关闭登录框');
    this.setState({
      visible: false,
    });
  }
  render () {
    const { user } = this.props
    const { visible, confirmLoading, ModalText } = this.state
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
                  <img src={user.img} alt="头像"/>
                  <span>{user.name}</span>
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
        >
          <p>{ModalText}</p>
        </Modal>
      </header>
    )
  }
}

export default Foot