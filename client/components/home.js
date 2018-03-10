import React, { Component } from 'react'
import {connect} from 'react-redux'
import firebase from '../../firebase'
import { Form, Button } from 'semantic-ui-react'
import { addBoardThunk, addTaskThunk, initTasksThunk, watchTaskAddedEvent } from '../store'

export class Home extends Component {

  componentDidMount() {
    this.props.onGetTasks();
  }

  render(){
    return (
      <div>
      <Form onSubmit={(e, data) => this.props.submitHandler(e.target.name.value)} size='small'>
      <Form.Group widths='equal'>
        <Form.TextArea control='input' placeholder='New Task Board' name="name" />
      </Form.Group>
      <Button type='submit'>Add Task</Button>
    </Form>
    <Form onSubmit={(e) => this.props.submitTask(e.target.name.value)} size='small'>
      <Form.Group widths='equal'>
        <Form.TextArea control='input' placeholder='New Task' name="name" />
      </Form.Group>
      <Button type='submit'>Add Task</Button>
    </Form>
      {this.props.newTasks.map(task => <h1>{task.name}</h1>)}
      </div>
    )
  }

}

const mapProps = (state) => ({
  newTasks: state.newTasks
})
const mapDispatch = (dispatch) => {
  watchTaskAddedEvent(dispatch)
  return {
    submitHandler(name) {
      dispatch(addBoardThunk(name))
    },
    submitTask(name){
      dispatch(addTaskThunk(name))
    },
    onGetTasks(){
      dispatch(initTasksThunk())
    }
  }
}

export default connect(mapProps, mapDispatch)(Home)
