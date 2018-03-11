import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from '../../firebase'
import { Form, Button } from 'semantic-ui-react'
import { addBoardThunk, watchBoardAddEvent, initBoardsThunk, setBoard } from '../store'
import history from '../history'

export class Home extends Component {

  componentDidMount() {
    this.props.getUserBoards(this.props.user.id)
  }

  render(){
    return (
      <div>
        <h1>Welcome {this.props.user.email}</h1>
        <Form onSubmit={(e, data) => this.props.submitHandler(e.target.name.value, this.props.user.id)} size='small'>
          <Form.Group >
            <Form.TextArea control='input' placeholder='New Task Board' name="name" />
          </Form.Group>
          <Button type='submit'>Create New Board</Button>
        </Form>
        {this.props.userBoards.map(board => <Button onClick={() => this.props.setClick(board.tag)} key={board.tag}>{board.name}</Button>)}
      </div>
    )
  }

}

const mapProps = (state) => ({
  user: state.user,
  board: state.board,
  userBoards: state.allBoards
})
const mapDispatch = (dispatch) => {
  // watchBoardAddEvent(dispatch)
  return {
     submitHandler(name, userId) {
      dispatch(addBoardThunk(name, userId))
    },
    getUserBoards(id){
      dispatch(initBoardsThunk(id))
    },
    setClick(board){
      dispatch(setBoard(board))
      history.push('/board')
    }
  }
}

export default connect(mapProps, mapDispatch)(Home)
