import React, { Component } from 'react'
import './index.scss'

class About extends Component {
  componentWillMount () {
    document.title = '关于我们'
  }
  render () {
    return (
      <section>About</section>
    )
  }
}

export default About