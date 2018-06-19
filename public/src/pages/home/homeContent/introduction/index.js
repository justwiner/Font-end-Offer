import React, {Component} from 'react'
import {Icon} from 'antd'
import './index.scss'

const intr = [
  {
    iconType: 'cloud-upload-o',
    title: '简单快捷',
    intro: '下班挤地铁无聊？ok！多学习一点前端知识吧！',
    style: {
      background: '#36C2BC'
    }
  },{
    iconType: 'cloud-upload-o',
    title: '集群共享',
    intro: '题库中的所有题目都将由你来维护，营造良好的生态圈。',
    style: {
      background: '#5BD3F3'
    }
  },{
    iconType: 'cloud-upload-o',
    title: '上传问题',
    intro: '将自己发现的问题上传，它将共享给我们所有的前端开发者。',
    style: {
      background: '#F6B47F'
    }
  },{
    iconType: 'cloud-upload-o',
    title: '记录点滴',
    intro: '每一次提交，每一次的成长，都会保存在案，这就是你的前端成长路程。',
    style: {
      background: '#91CD9D'
    }
  }
]

class Introduction extends Component {
  render () {
    return (
      <section className="header-content-intr">
        <font>希望能够满足你的需求</font>
        <div className="header-content-intr-circle">
          {
            intr.map((item, index) => {
              return (
                <div key={index}>
                  <article style={item.style}>
                    <Icon type={item.iconType} />
                    <span>{item.title}</span>
                  </article>
                  <p>{item.intro}</p>
                </div>
              )
            })
          }
        </div>
      </section>
    )
  }
}

export default Introduction