import React, { Component } from 'react'
import {Form, Input, Button, message} from 'antd'
import {UserService} from '../../lib'
const FormItem = Form.Item;

const regNumAndStr = /^[0-9a-zA-Z]+$/

class ChangePass extends Component {
  state = {
    confirmDirty: false,
    loading: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ loading: true })
        const result = (await UserService.modifyPass({ oldPass: values.oldPassword, newPass: values.newPassword })).data
        console.log(result)
        if ( result.success ) {
          message.success(result.message)
          this.props.actions.logout();
          this.props.history.push('/')
        } else {
          message.error(result.message)
          this.setState({ loading: false })
        }
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword = (rule, value, callback) => {
    if (!regNumAndStr.test(value)) {
      callback('密码只是数字与字母的组合!')
    }
    callback()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('新密码与你确认的密码不匹配!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const {loading} = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 4,
          offset: 4,
        },
      },
    };
    return (
      <section className="userInfo-right-pass">
        <article className="userInfo-right-pass-title">密码修改</article>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="旧密码"
          >
            {getFieldDecorator('oldPassword', {
              rules: [{
                required: true, message: '请输入旧密码!',
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator('newPassword', {
              rules: [{
                required: true, message: '请输入新密码!',
              }, {
                min: 6, max: 16, message: '长度为 6 - 16 !'
              }, {
                validator: this.validateToNextPassword,
              }, {
                validator: this.checkPassword
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认新密码！',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button loading={loading}  type="primary" htmlType="submit">修改</Button>
          </FormItem>
        </Form>
      </section>
    )
  }
}

export default Form.create()(ChangePass)