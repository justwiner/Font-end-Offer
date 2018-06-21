import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import {Captcha} from '../../components'
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
      captcha: ''
    }
  }
  componentWillMount () {
    this.setState({ captcha: this.randomcaptcha() })
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { captcha } = this.state
        if (values.captcha === captcha) {
          console.log(values);
        } else {
          message.error('两次验证码不相同！')
        }
      }
    });
  }
  nickNameOnChange = e => this.setState({ nickName: e.target.value })
  emailOnChange = e => this.setState({ eMail: e.target.value })
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
  render () {
    const { getFieldDecorator } = this.props.form;
    const { captcha } = this.state
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
          <FormItem className="register-form">
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '请输入正确格式的邮箱!',
              }, {
                required: true, message: '请输入邮箱!',
              }],
            })(
              <Input autoComplete='email' onChange={this.emailOnChange} size="large" placeholder="邮箱"/>
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
            <Button size="large" type="primary" htmlType="submit">注册</Button>
          </FormItem>
        </Form>
      </section>
    )
  }
}

export default Form.create()(Register)