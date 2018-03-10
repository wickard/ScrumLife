import firebase from '../../firebase'
/**
 * ACTION TYPES
 */
const ADD_NEW_TASK = 'New-Task'
const REMOVE_NEW_TASK = 'remove New-Task'
const INIT_TASKS = 'init tasks'

/**
 * ACTION CREATORS
 */
export const addNewTask = (task) => ({type: ADD_NEW_TASK, task})
export const removeNewTask = (task) => ({type: REMOVE_NEW_TASK, task})
export const initTasks = (tasks) => ({type: INIT_TASKS, tasks})



/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case INIT_TASKS:
      return action.tasks
    case ADD_NEW_TASK:
      return [...state, action.task]
    case REMOVE_NEW_TASK:
      return state.filter(task => task.id !== action.task.id)
    default:
      return state
  }
}

export function addTaskThunk(name) {
    //find the id of the thing your about to push into firebase, and set it
    const id = firebase.ref().child('newTasks').push().key
    firebase.ref(`/joshboard/newTasks/${id}`).set({
      name, id
    })
}

export function initNewTasksThunk() {
  return dispatch => {
    const tasks = [];
    firebase.ref(`/joshboard/newTasks`).once('value', snap => {
      snap.forEach(data => {
        let task = data.val();
        tasks.push(task)
      })
    })
    .then(() => dispatch(initTasks(tasks)))
  }
}

export function watchTaskAddedEvent(dispatch) {
  firebase.ref('/joshboard/newTasks').on('child_added', (snap) => {
    dispatch(addNewTask(snap.val()));
  });
}

export function removeTaskThunk(id) {
    console.log(id)
    const tasks = firebase.ref('/joshboard/newTasks')
    tasks.child(id).remove();
}

export function watchTaskRemovedEvent(dispatch) {
  firebase.ref('/joshboard/newTasks').on('child_removed', (snap) => {
    const task = snap.val()
    dispatch(removeNewTask(task));
  });
}
