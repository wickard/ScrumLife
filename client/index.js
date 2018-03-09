import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import style from '../node_modules/react-dragula/dist/dragula.css'
import drake from './drake'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

drake.on('drop', (el, target, source) => {
  store.dispatch({type: target.id, task: el.id})
  store.dispatch({type: 'remove ' + source.id, task: el.id })
  el.remove()
})
