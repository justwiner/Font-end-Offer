import React, { Component } from 'react'
import { Form, Input, Button, message, Icon } from 'antd'
import {Captcha} from '../../components'
import {Service,UserService} from '../../lib'
import './index.scss'
const FormItem = Form.Item;

const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
    regNumAndStr = /^[0-9a-zA-Z]+$/,
    strs = 'qwertyuiopasdfghjklzxcvbnm123456789'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nickName: '',
      eMail: '',
      password: '',
      rePassword: '',
      captcha: '',
      checkLoading: "检测邮箱",
      registerLoading: false
    }
  }
  componentWillMount () {
    const user = UserService.user,
      token = UserService.token
    user !== null && token !== '' 
      ? this.props.history.push('/') 
      : this.setState({ captcha: this.randomcaptcha() })
  }
  randomcaptcha = () => {
    const length = 4;
    const size = strs.length
    let temp = ''
    for ( let i = 0; i < length; i++ ) {
      temp += strs[Math.floor(Math.random() * size)]
    }
    return temp
  }
  refreshCaptcha = () => {
    document.getElementById('captcha').value = ''
    this.setState({ captcha: this.randomcaptcha() })
  }
  register = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { captcha } = this.state
        if (values.captcha === captcha) {
          this.setState({registerLoading: true})
          const { eMail, password, nickName } = values,
            data = (await Service.register({ eMail, password, nickName })).data,
            mes = data.message
            if (data.success) {
              message.success(mes)
              this.setState({registerLoading: false})
              this.props.actions.login(data)
              this.props.history.push('/')
            } else {
              message.error(mes)
              this.setState({registerLoading: false})
            }
        } else {
          message.error('两次验证码不相同！')
        }
      }
    });
  }
  nickNameOnChange = e => this.setState({ nickName: e.target.value })
  eMailOnChange = e => this.setState({ eMail: e.target.value })
  passwordOnChange = e => this.setState({ password: e.target.value })
  rePasswordOnChange = e => this.setState({ rePassword: e.target.value })
  checkPassword = (rule, value, callback) => {
    if (!regNumAndStr.test(value)) {
      callback('密码只是数字与字母的组合!')
    }
    callback()
  }
  checkRePassword = (rule, value, callback) => {
    const { password } = this.state
    if ( password !== value ) {
      callback("两次输入的密码不一样!")
    }
    callback()
  }
  checkNickName = (rule, value, callback) => {
    if ( regCn.test(value) || regEn.test(value) ) {
      callback('昵称不应该包含特殊字符！')
    }
    callback()
  }
  checkCaptcha = (rule, value, callback) => {
    const { captcha } = this.state
    if ( value !== captcha ) {
      callback('两次输入的验证码不一致！')
    }
    callback()
  }
  checkEMail = async (e) => {
    this.setState({checkLoading: (<Icon type="loading" />)})
    const {eMail} = this.state
    if (eMail !== '') {
      const data = (await Service.checkEMail({eMail})).data
      const {success} = data,
        mes = data.message
      success ? message.success(mes) : message.error(mes)
    } else {
      message.error('请输入邮箱！')
    }
    this.setState({checkLoading: "检测邮箱"})
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const { captcha, checkLoading, registerLoading } = this.state
    return (
      <section className="register">
        <article>欢迎加入 Font Family</article>
        <Form onSubmit={this.register}>
          <FormItem className="register-form">
            {getFieldDecorator('nickName', {
              rules: [ {
                required: true, message: '请输入昵称!',
              }, {
                max:10, message: '不超过10个字符！'
              }, {
                validator: this.checkNickName
              }],
            })(
              <Input onChange={this.nickNameOnChange} size="large" placeholder="昵称"/>
            )}
          </FormItem>
          <FormItem className="register-form register-eMail">
            {getFieldDecorator('eMail', {
              rules: [{
                type: 'email', message: '请输入正确格式的邮箱!',
              }, {
                required: true, message: '请输入邮箱!',
              }],
            })(
              <div>
                <Input autoComplete='eMail' onChange={this.eMailOnChange} size="large" placeholder="邮箱"/>
                <Button size="large" onClick={this.checkEMail}>
                  {checkLoading}
                </Button>
              </div>
            )}
          </FormItem>
          <FormItem className="register-form">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码!',
              }, {
                min: 6, max: 16, message: '长度为 6 - 16 !',
              }, {
                validator: this.checkPassword
              }],
            })(
              <Input autoComplete="new-password" type="password" onChange={this.passwordOnChange} size="large" placeholder="密码"/>
            )}
          </FormItem>
          <FormItem className="register-form">
            {getFieldDecorator('rePassword', {
              rules: [{
                required: true, message: '请输入密码!',
              }, {
                validator: this.checkRePassword
              }],
            })(
              <Input autoComplete="new-password" type="password" onChange={this.rePasswordOnChange} size="large" placeholder="确认密码"/>
            )}
          </FormItem>
          <div className="register-form captcha">
            <div>
                <div className="_captcha" onClick={this.refreshCaptcha}><Captcha captcha={captcha}/></div>
            </div>
          </div>
          <FormItem className="register-form captcha-form">
            {getFieldDecorator('captcha', {
              rules: [{
                validator: this.checkCaptcha
              }]
            })(
              <Input size="large" placeholder="请输入验证码"/>
            )}
          </FormItem>
          <FormItem className="register-form">
            <Button loading={registerLoading} size="large" type="primary" htmlType="submit">注册</Button>
          </FormItem>
        </Form>
      </section>
    )
  }
}

export default Form.create()(Register)