import React, { Component } from 'react'
import {Icon} from 'antd'

class Home extends Component {
  render () {
    return (
      <section className="userInfo-right-home">
        <section className="userInfo-right-home-achievement">
          <article>成就</article>
          <section className="userInfo-right-home-achievement-content">
            <section>
              <article>0　次被赞<Icon type="like-o" /></article>
            </section>
            <section>
              <article>0　次被讨厌<Icon type="dislike-o" /></article>
            </section>
            <section>
              <article>0　次贡献<Icon type="upload" /></article>
            </section>
            <section>
              <article>0　次试题测试<Icon type="form" /></article>
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default Home