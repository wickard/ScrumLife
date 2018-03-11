import firebase from '../../firebase'
/**
 * ACTION TYPES
 */
const ADD_MEMBER = 'add member'
const INIT_MEMBERS = 'init members'

/**
 * ACTION CREATORS
 */
export const initMembers = (members) => ({type: INIT_MEMBERS, members})
export const addMember = (member) => ({type: ADD_MEMBER, member})

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case INIT_MEMBERS:
      return action.members
    case ADD_MEMBER:
      if (state.includes(action.member)) return state
      return [...state, action.member]
    default:
      return state
  }
}

export function watchMemberAdd(board, dispatch) {
  //find the id of the thing your about to push into firebase, and set it
  // const id = firebase.ref().child('doneTask').push().key
  firebase.ref(`/${board}/members`).on('child_added', snap => {
    dispatch(addMember(snap.val()))
  })
}


export function initMembersThunk(board) {
  return dispatch => {
    const members = [];
    firebase.ref(`/${board}/members`).once('value', snap => {
      snap.forEach(data => {
        let member = data.val();
        members.push(member)
      })
    })
    .then(() => dispatch(initMembers(members)))
  }
}
