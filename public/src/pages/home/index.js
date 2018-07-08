import React, { Component } from 'react'
import HomeHeader from './homeHeader'
import {Introduction, Section} from './homeContent'
import './index.scss'
import Fast from '../../asset/fast.png'
import Flexible from '../../asset/flexible.png'
import TimeSave from '../../asset/save.png'
import Free from '../../asset/free.png'

const ad = [
  {
    type:true,
    title: '快',
    font: '人一步',
    info: '快速出题，不浪费你的一分一秒。',
    ads: [
      '共享题库',
      '随机抽题',
      '快速阅卷'
    ],
    img: Fast,
    fontStyle: {color: "#AEFFC0"},
    bgStyle: {background: '#91CD9D',color: 'white'}
  },{
    type:false,
    title: '灵',
    font: '活多变',
    info: '数据交付给用户维护，构建良好生态圈。',
    ads: [
      '用户主控',
      '数据共享',
      '后台不定时审核',
      '保证生态圈的良好发展'
    ],
    img: Flexible,
    fontStyle: {color: "#39C1BD"},
    bgStyle: {background: 'white',color: 'black'}
  },{
    type:true,
    title: '省',
    font: '时省心',
    info: '只需一分钟，即可完成一道题目，茶余饭后来一题！',
    ads: [
      '知识无价',
      '提神醒脑，闲时来一题！',
      '不用做一整套试卷',
      '选择纠结症？试试随机来一题'
    ],
    img: TimeSave,
    fontStyle: {color: "#64FFFB"},
    bgStyle: {background: '#36C2BC',color: 'white'}
  },{
    type:false,
    title: '免',
    font: '费使用',
    info: '本网站不收费，只为创造一个前端人的社区。',
    ads: [
      '完全免费',
      '数据随时查询',
      '服务器长期运行'
    ],
    img: Free,
    fontStyle: {color: "#39C1BD"},
    bgStyle: {background: 'white',color: 'black'}
  }
]

class Home extends Component {
  componentWillMount () {
    document.title = 'Front family'
  }
  render () {
    return (
      <section className="home">
        <HomeHeader />
        <div className="home-content">
          <Introduction />
          {
            ad.map((item, index) => {
              return (
                <Section
                key={index}
                title= {item.title}
                font= {item.font}
                info= {item.info}
                ads= {item.ads}
                type={item.type}
                img={item.img} 
                fontStyle={item.fontStyle} 
                bgStyle={item.bgStyle} />
              )
            })
          }
        </div>
      </section>
    )
  }
}

export default Home