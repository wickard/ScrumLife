import firebase from '../../firebase'
import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_BOARD = 'Set board'

/**
 * ACTION CREATORS
 */
export const setBoard = (board) => ({type: SET_BOARD, board})

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_BOARD:
      return action.board
    default:
      return state
  }
}

