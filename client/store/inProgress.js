import firebase from '../../firebase'
/**
 * ACTION TYPES
 */
const ADD_PROGRESS_TASK = 'Progress-Task'
const REMOVE_PROGRESS_TASK = 'remove Progress-Task'
const INIT_PROGRESS_TASK = 'init progress task'

/**
 * ACTION CREATORS
 */
export const addProgressTask = (task) => ({type: ADD_PROGRESS_TASK, task})
export const removeProgressTask = (task) => ({type: REMOVE_PROGRESS_TASK, task})
export const initProgressTasks = (tasks) => ({type: INIT_PROGRESS_TASK, tasks}
)

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case INIT_PROGRESS_TASK:
      return action.tasks
    case ADD_PROGRESS_TASK:
      return [...state, action.task]
    case REMOVE_PROGRESS_TASK:
      return state.filter(task => task.id !== action.task.id)
    default:
      return state
  }
}

export function addProgressTaskThunk(board, name) {
    //find the id of the thing your about to push into firebase, and set it
    const id = firebase.ref().child('progressTask').push().key
    firebase.ref(`/${board}/progressTask/${id}`).set({
      name, id
    })
}

export function initProgressTasksThunk(board) {
  return dispatch => {
    const tasks = [];
    console.log('firing init')
    firebase.ref(`/${board}/progressTask`).once('value', snap => {
      snap.forEach(data => {
        let task = data.val();
        tasks.push(task)
      })
    })
    .then(() => dispatch(initProgressTasks(tasks)))
  }
}

export function watchProgressTaskAddedEvent(board, dispatch) {
  firebase.ref(`/${board}/progressTask`).on('child_added', (snap) => {
    dispatch(addProgressTask(snap.val()));
  });
}

export function removeProgressTaskThunk(board, id) {
    const tasks = firebase.ref(`/${board}/progressTask`)
    tasks.child(id).remove();
}

export function watchProgressTaskRemovedEvent(board, dispatch) {
  firebase.ref(`/${board}/progressTask`).on('child_removed', (snap) => {
    const task = snap.val()
    dispatch(removeProgressTask(task));
  });
}
