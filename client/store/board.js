import firebase from '../../firebase'
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

// export function watchBoardAddEvent(dispatch) {
//   firebase.ref('/').on('child_added', (snap) => {
//     dispatch(addBoard(snap.val()));
//   });
// }


export function addBoardThunk(name) {
  return dispatch => {
    firebase.ref('/').push({
      name
    })
    .then(() => {
      dispatch(addBoard({ name }));
    })
  }
}
