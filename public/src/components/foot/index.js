import React, { Component } from 'react'
import {Icon} from 'antd'
import './index.scss'

const frendlyLink = [
  {
    title: 'Winer',
    link: 'http://about.luyuwen.cn'
  }
]

class Head extends Component {
  render () {
    return (
      <footer className="foot">
        <div className="foot-left">
          <article>Front Family</article>
          <p>Front Family 力求营造一个良好的前端社区、平台</p>
          <p>用户可以将自己喜欢的问题分享给其他前端人，也可以在 Front Family 中学习到更多的新知识。</p>
          <p>©2018 luyuwen.cn 渝ICP备18005473号</p>
        </div>
        <div className="foot-right">
          <article>友情链接</article>
          <ul>
            {
              frendlyLink.map((item, index) => {
                return <li key={index}><a href={item.link} target="blank">{item.title}</a></li>
              })
            }
          </ul>
          <p>
            <a href="https://github.com/justwiner/Font-end-Offer"  target="blank"><Icon type="github" /></a>
          </p>
        </div>
      </footer>
    )
  }
}

export default Head