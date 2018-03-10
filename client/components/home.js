import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from '../../firebase'
import { Form, Button } from 'semantic-ui-react'
import { addBoardThunk, watchBoardAddEvent } from '../store'

export class Home extends Component {

  componentDidMount() {

  }

  render(){
    return (
      <div>
        <h1>Welcome {this.props.user.email}</h1>
        <Form onSubmit={(e, data) => this.props.submitHandler(e.target.name.value)} size='small'>
          <Form.Group >
            <Form.TextArea control='input' placeholder='New Task Board' name="name" />
          </Form.Group>
          <Button type='submit'>Create New Board</Button>
        </Form>
        <h1>{this.props.board.name}</h1>
      </div>
    )
  }

}

const mapProps = (state) => ({
  user: state.user,
  board: state.board
})
const mapDispatch = (dispatch) => {
  watchBoardAddEvent(dispatch)
  return {
    submitHandler(name) {
     addBoardThunk(name)
    }
  }
}

export default connect(mapProps, mapDispatch)(Home)
