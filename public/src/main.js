import React, { Component } from 'react'
import {render} from 'react-dom'
import App from './container/App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
