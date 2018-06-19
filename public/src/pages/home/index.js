import React, { Component } from 'react'
import HomeHeader from './homeHeader'
import {Introduction} from './homeContent'
import './index.scss'



class Home extends Component {
  render () {
    return (
      <section className="home">
        <HomeHeader />
        <div className="home-content">
          <Introduction />
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </section>
    )
  }
}

export default Home