import React, { Component } from 'react'
import {Foot, Head} from '../components'
import {BrowserRouter, Route} from 'react-router-dom'
import {Home, About , Upload , Questions} from '../pages'
import './index.scss'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
      <div id="app">
        <Head />
        <Route exact path="/" component = {Home}/>
        <Route path="/upload" component = {Upload}/>
        <Route path="/about" component = {About}/>
        <Route path="/questions" component = {Questions}/>
        <Foot />
      </div>
      </ BrowserRouter>
    )
  }
}

export default App