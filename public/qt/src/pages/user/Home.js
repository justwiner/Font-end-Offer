import React, { Component } from 'react'
import Achievement from './home/achievement'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }
  render () {
    return (
      <section className="userInfo-right-home">
        <Achievement />
      </section>
    )
  }
}

export default Home