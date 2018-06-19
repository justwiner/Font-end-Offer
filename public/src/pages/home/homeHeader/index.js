import React, { Component } from 'react'
import Bg from '../../../asset/bg.jpg'
import './index.scss'

const homeHeaderStyle = {
  background: `url(${Bg})`,
  width: '100%',
  height: '100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 0',
  backgroundAttachment: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

class HomeHeader extends Component {
  render () {
    return (
      <div style={homeHeaderStyle}>
        <section className="home-header-content">
          <div>
            <font>一分钟</font>
            <font>可以做任何事情</font>
          </div>
          <div>
            <font>但是这一分钟，</font>
            <font>我希望你可以学习更多！</font>
          </div>
          <div>
            <span>马上开始</span>
          </div>
        </section>
      </div>
    )
  }
}

export default HomeHeader