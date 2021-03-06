import firebase from '../../firebase'
import axios from 'axios'
/**
 * ACTION TYPES
 */
const INIT_BOARDS = 'Init boards'
const ADD_BOARD = 'add board'

/**
 * ACTION CREATORS
 */
export const initBoards = (boards) => ({type: INIT_BOARDS, boards})
export const addBoard = (board) => ({type: ADD_BOARD, board})

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case INIT_BOARDS:
      return action.boards
    case ADD_BOARD:
      return [...state, action.board]
    default:
      return state
  }
}

export function initBoardsThunk(id){
  return dispatch =>
  axios.get(`api/users/${id}/boards`)
  .then(res => res.data)
  .then(boards => dispatch(initBoards(boards)))
}

export function addBoardThunk(name, userId, email) {
    return dispatch => {
    const id = firebase.ref().push().key
    firebase.ref(`/${id}`).set({
      name, id
    })
    firebase.ref(`/${id}/members`).push(email)
    axios.post('/api/boards', {tag: id, name, userId})
    .then(res => res.data)
    .then(board => dispatch(addBoard(board)))
  }
}

export function joinBoardThunk(tag, userId, email) {
  return dispatch => {
  firebase.ref(`/${tag}/members`).push(email)
  axios.post(`/api/users/${userId}/boards`, {tag})
  .then(res => res.data)
  .then(board => dispatch(addBoard(board)))
  }
}
