import React, { Component } from 'react'
import {render} from 'react-dom'
import App from './container/App'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(thunk))
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
