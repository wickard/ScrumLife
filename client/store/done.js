import firebase from '../../firebase'
/**
 * ACTION TYPES
 */
const ADD_DONE_TASK = 'Complete-Task'
const REMOVE_DONE_TASK = 'remove Complete-Task'
const INIT_DONE_TASKS = 'init done tasks'
/**
 * ACTION CREATORS
 */
export const addDoneTask = (task) => ({type: ADD_DONE_TASK, task})
export const removeDoneTask = (task) => ({type: REMOVE_DONE_TASK, task})
export const initDoneTasks = (tasks) => ({type: INIT_DONE_TASKS, tasks})

/**
 *
 */
export default function (state = [], action) {
  switch (action.type) {
    case INIT_DONE_TASKS:
      return action.tasks
    case ADD_DONE_TASK:
      return [...state, action.task]
    case REMOVE_DONE_TASK:
      return state.filter(task => task.id !== action.task.id)
    default:
      return state
  }
}


export function addDoneTaskThunk(board, name) {
    //find the id of the thing your about to push into firebase, and set it
    const id = firebase.ref().child('doneTask').push().key
    firebase.ref(`/${board}/doneTask/${id}`).set({
      name, id
    })
}

export function initDoneTasksThunk(board) {
  return dispatch => {
    const tasks = [];
    firebase.ref(`/${board}/doneTask`).once('value', snap => {
      snap.forEach(data => {
        let task = data.val();
        tasks.push(task)
      })
    })
    .then(() => dispatch(initDoneTasks(tasks)))
  }
}

export function watchDoneTaskAddedEvent(board, dispatch) {
  firebase.ref(`/${board}/doneTask`).on('child_added', (snap) => {
    dispatch(addDoneTask(snap.val()));
  });
}

export function removeDoneTaskThunk(board, id) {
    const tasks = firebase.ref(`/${board}/doneTask`)
    tasks.child(id).remove();
}

export function watchDoneTaskRemovedEvent(board, dispatch) {
  firebase.ref(`/${board}/doneTask`).on('child_removed', (snap) => {
    const task = snap.val()
    dispatch(removeDoneTask(task));
  });
}
