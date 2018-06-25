import React, { Component } from 'react'
import {Icon, Button} from 'antd'
import {Link} from 'react-router-dom'

class CreateSuccess extends Component {
  componentWillMount () {
    // console.log(this.props)
  }
  render () {
    return (
      <section className="create-success">
        <p><Icon type="check-circle-o" /></p>
        <p>创建成功</p>
        <p>非常感谢你对社区的贡献，开发者代表Font Family 向你表示最真诚的谢意。</p>
        <p>
          <Link to='/questions'><Button type="primary" size="large">题库</Button></Link>
          <Link to='/questions'><Button size="large">个人中心</Button></Link>
        </p>
      </section>
    )
  }
}

exports = module.exports = CreateSuccess