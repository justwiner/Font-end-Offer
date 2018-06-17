import React, { Component } from 'react'
import {Foot, Head} from '../components'
import './index.scss'

class App extends Component {
  render () {
    return (
      <div id="app">
        <Head />
        <Foot />
      </div>
    )
  }
}

export default App