import React, { Component } from 'react'
import {Foot, Head} from '../components'
import {BrowserRouter, Route} from 'react-router-dom'
import {Home, About , Upload , Questions, Register} from '../pages'
import {message} from 'antd'
import './index.scss'
import {connect} from 'react-redux'
import Actions from '../actions'
import {bindActionCreators} from 'redux'

message.config({
  top: '7vw',
  duration: 2,
  maxCount: 3,
});

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div id="app">
          <Head {...this.props}/>
          <Route exact path="/" component = {Home}/>
          <Route path="/upload" render={(props) => <Upload {...Object.assign(props,this.props)}/>} />
          <Route path="/about" component = {About}/>
          <Route path="/questions" render={(props) => <Questions {...Object.assign(props,this.props)}/>}/>
          <Route exact path="/register" render={(props) => <Register {...Object.assign(props,this.props)}/>} />
          <Foot />
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  const { chapters, difficultyLevels, sortBy } = state.question
  return {
    question: {
      chapters: chapters.sort((left, right) => left.id - right.id),
      difficultyLevels,
      sortBy,
    },
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)