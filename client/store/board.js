import firebase from '../../firebase'
import axios from 'axios'
/**
 * ACTION TYPES
 */
const ADD_BOARD = 'Add board'

/**
 * ACTION CREATORS
 */
export const addBoard = (board) => ({type: ADD_BOARD, board})

/**
 * REDUCER
 */
export default function (state = '', action) {
  switch (action.type) {
    case ADD_BOARD:
      return action.board
    default:
      return state
  }
}

export function watchBoardAddEvent(dispatch) {
  firebase.ref('/').on('child_added', (snap) => {
    dispatch(addBoard(snap.val()));
  });
}


export function addBoardThunk(name, userId) {
  const id = firebase.ref().push().key
  firebase.ref(`/${id}`).set({
    name, id
  })
  axios.post('/api/boards', {tag: id, name, userId})
}

