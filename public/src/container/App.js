import React, { Component } from 'react'
import {Foot, Head} from '../components'
import {BrowserRouter, Route} from 'react-router-dom'
import {Home, About , Upload , Questions, Register} from '../pages'
import './index.scss'
import {connect} from 'react-redux'
import Actions from '../actions'
import {bindActionCreators} from 'redux'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
      <div id="app">
        <Head {...this.props}/>
        <Route exact path="/" component = {Home}/>
        <Route path="/upload" component = {Upload}/>
        <Route path="/about" component = {About}/>
        <Route path="/questions" component = {Questions}/>
        <Route exact path="/register" component={Register} />
        <Foot />
      </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chapters: state.question.chapters,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)