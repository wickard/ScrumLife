import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import newTasks from './newTasks'
import inProgress from './inProgress'
import done from './done'
import board from './board'
import allBoards from './allboard'

const reducer = combineReducers({user, board, newTasks, inProgress, done, allBoards})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './newTasks'
export * from './board'
export * from './done'
export * from './inProgress'
export * from './allboard'
