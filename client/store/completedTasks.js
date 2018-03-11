import firebase from '../../firebase'
/**
 * ACTION TYPES
 */
const ADD_TICKER_TASK = 'add ticker task'
const INIT_TICKER_TASKS = 'init ticker taskss'
/**
 * ACTION CREATORS
 */
export const addTickerTask = (task) => ({type: ADD_TICKER_TASK, task})
export const initTickerTasks = (tasks) => ({type: INIT_TICKER_TASKS, tasks})

/**
 *
 */
export default function (state = [], action) {
  switch (action.type) {
    case INIT_TICKER_TASKS:
      return action.tasks
    case ADD_TICKER_TASK:
      return [...state, action.task]
    default:
      return state
  }
}


export function addTickerTaskThunk(board, task, email) {
    //find the id of the thing your about to push into firebase, and set it
    firebase.ref(`/${board}/ticker`).push({task, email})
}

export function initTickerTasksThunk(board) {
  return dispatch => {
    const tasks = [];
    firebase.ref(`/${board}/ticker`).once('value', snap => {
      snap.forEach(data => {
        let task = data.val();
        tasks.push(task)
      })
    })
    .then(() => dispatch(initTickerTasks(tasks)))
  }
}

export function watchTickerTaskAddedEvent(board, dispatch) {
  firebase.ref(`/${board}/ticker`).on('child_added', (snap) => {
    dispatch(addTickerTask(snap.val()));
  });
}
