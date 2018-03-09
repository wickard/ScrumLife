
/**
 * ACTION TYPES
 */
const ADD_NEW_TASK = 'New-Task'
const REMOVE_NEW_TASK = 'remove New-Task'

/**
 * ACTION CREATORS
 */
export const addNewTask = (task) => ({type: ADD_NEW_TASK, task})
export const removeTask = (task) => ({type: REMOVE_NEW_TASK, task})

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case ADD_NEW_TASK:
      return [...state, action.task]
      case REMOVE_NEW_TASK:
      return state.filter(task => task !== action.task)
    default:
      return state
  }
}
