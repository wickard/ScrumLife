/**
 * ACTION TYPES
 */
const ADD_DONE_TASK = 'Complete-Task'
const REMOVE_DONE_TASK = 'remove Complete-Task'

/**
 * ACTION CREATORS
 */
export const addNewTask = (task) => ({type: ADD_DONE_TASK, task})
export const removeTask = (task) => ({type: REMOVE_DONE_TASK, task})

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case ADD_DONE_TASK:
      return [...state, action.task]
      case REMOVE_DONE_TASK:
      return state.filter(task => task !== action.task)
    default:
      return state
  }
}
