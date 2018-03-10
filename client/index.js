import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store, {addDoneTaskThunk, removeDoneTaskThunk, addProgressTaskThunk, removeProgressTaskThunk, addTaskThunk, removeTaskThunk} from './store'
import App from './app'
import style from '../node_modules/react-dragula/dist/dragula.css'
import drake from './drake'
import firebase from '../firebase'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)


const removeCard = (source, elementId) => {
  if (source === 'New-Task') {
    removeTaskThunk(elementId)
  }
  if (source === 'Progress-Task') {
    removeProgressTaskThunk(elementId)
  }
  if (source === 'Complete-Task') {
    removeDoneTaskThunk(elementId)
  }
}


drake.on('drop', (el, target, source) => {
  if (!target) return
  switch (target.id){
    case 'New-Task':
      addTaskThunk(el.getAttribute('task'))
      removeCard(source.id, el.id)
      el.remove()
      break
    case 'Progress-Task':
      console.log(el.getAttribute('task'))
      addProgressTaskThunk(el.getAttribute('task'))
      removeCard(source.id, el.id)
      el.remove()
      break
    case 'Complete-Task':
      addDoneTaskThunk(el.getAttribute('task'))
      removeCard(source.id, el.id)
      el.remove()
      break
    default:
      break
  }
})
