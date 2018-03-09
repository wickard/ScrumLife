
/**
 * ACTION TYPES
 */
const ADD_PROGRESS_TASK = 'Progress-Task'
const REMOVE_PROGRESS_TASK = 'remove Progress-Task'

/**
 * ACTION CREATORS
 */
export const addNewTask = (task) => ({type: ADD_PROGRESS_TASK, task})
export const removeTask = (task) => ({type: REMOVE_PROGRESS_TASK, task})

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case ADD_PROGRESS_TASK:
      return [...state, action.task]
      case REMOVE_PROGRESS_TASK:
      return state.filter(task => task !== action.task)
    default:
      return state
  }
}
