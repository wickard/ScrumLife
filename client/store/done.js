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


export function addDoneTaskThunk(name) {
    //find the id of the thing your about to push into firebase, and set it
    const id = firebase.ref().child('doneTask').push().key
    firebase.ref(`/joshboard/doneTask/${id}`).set({
      name, id
    })
}

export function initDoneTasksThunk() {
  return dispatch => {
    const tasks = [];
    firebase.ref(`/joshboard/doneTask`).once('value', snap => {
      snap.forEach(data => {
        let task = data.val();
        tasks.push(task)
      })
    })
    .then(() => dispatch(initDoneTasks(tasks)))
  }
}

export function watchDoneTaskAddedEvent(dispatch) {
  firebase.ref('/joshboard/doneTask').on('child_added', (snap) => {
    dispatch(addDoneTask(snap.val()));
  });
}

export function removeDoneTaskThunk(id) {
    const tasks = firebase.ref('/joshboard/doneTask')
    tasks.child(id).remove();
}

export function watchDoneTaskRemovedEvent(dispatch) {
  firebase.ref('/joshboard/doneTask').on('child_removed', (snap) => {
    const task = snap.val()
    dispatch(removeDoneTask(task));
  });
}
