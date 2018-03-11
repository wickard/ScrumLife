import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from '../../firebase'
import { Form, Button } from 'semantic-ui-react'
import { addBoardThunk, watchBoardAddEvent, initBoardsThunk, setBoard, joinBoardThunk, addMemberThunk, addMember } from '../store'
import history from '../history'
import { Link } from 'react-router-dom'

export class Home extends Component {

  componentDidMount() {
    this.props.getUserBoards(this.props.user.id)
  }

  render(){
    return (
      <div id="dashboard-container">
        <div className="flex">
          <div className="dash-div">
            <h1>{this.props.user.email}</h1>
          </div>
          <div className="dash-div">
            <h1>My Boards</h1>
          </div>
        </div>
        <div className="flex">
          <div className="dash-div1">
            <Form onSubmit={(e, data) => this.props.submitHandler(e.target.name.value, this.props.user.id, this.props.user.email)} size='small'>
              <Form.Group >
                <Form.Input control='input' placeholder='New Task Board' name="name" />
                <Button type='submit'>Create New Board</Button>
              </Form.Group>
            </Form>
            <Form onSubmit={(e, data) => this.props.joinHandler(e.target.joinName.value, this.props.user.id, this.props.user.email)} size='small'>
              <Form.Group >
                  <Form.Input control='input' placeholder='Join Board' name="joinName" />
                  <Button type='submit'>Join Board</Button>
                </Form.Group>
              </Form>
            </div>
            <div className="dash-div">
              {this.props.userBoards.map(board => <div key={board.tag}><Link  to={`/board/${board.tag}`}><Button>{board.name}</Button></Link> <span>id: {board.tag} </span> </div>)}
            </div>
        </div>
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
  return {
    submitHandler(name, userId, email) {
      dispatch(addBoardThunk(name, userId, email))
    },
    joinHandler(tag, userId, email){
      dispatch(joinBoardThunk(tag, userId, email))
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

// onClick={() => this.props.setClick(board.tag)}
