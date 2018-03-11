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


const removeCard = (source, elementId, board) => {
  if (source === 'New-Task') {
    removeTaskThunk(board, elementId)
  }
  if (source === 'Progress-Task') {
    removeProgressTaskThunk(board, elementId)
  }
  if (source === 'Complete-Task') {
    removeDoneTaskThunk(board, elementId)
  }
}

drake.on('drop', (el, target, source) => {
  if (!target) return
  const state = store.getState()
  let board = state.board
  switch (target.id){
    case 'New-Task':
      addTaskThunk(board, el.getAttribute('task'))
      removeCard(source.id, el.id, board)
      el.remove()
      break
    case 'Progress-Task':
      addProgressTaskThunk(board, el.getAttribute('task'))
      removeCard(source.id, el.id, board)
      el.remove()
      break
    case 'Complete-Task':
      addDoneTaskThunk(board, el.getAttribute('task'))
      removeCard(source.id, el.id, board)
      el.remove()
      break
    default:
      break
  }
})
