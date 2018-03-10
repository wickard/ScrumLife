import React, { Component } from 'react'
import {connect} from 'react-redux'
import Dragula from 'react-dragula'
import NewTaskColumn from './newTaskColumn'
import InProgressTaskColumn from './InProgressTaskColumn'
import CompleteTaskColumn from './CompleteTaskColumn'
import AddTaskModal from './addTask'
import { addBoardThunk, addTaskThunk, initNewTasksThunk, initDoneTasksThunk, initProgressTasksThunk } from '../store'
/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount() {
    this.props.onGetTasks();
  }
  render() {

    return (
      <div>
        <AddTaskModal submitHandler={this.props.submitTask} open={false} />
        <div className="flex" id="home">
          <div className="Column"> <h1>Not Started</h1> <hr width="70%" />
            <NewTaskColumn />
          </div>
          <div className="Column"> <h1>In Progress</h1> <hr width="70%" />
          <InProgressTaskColumn />
          </div>
          <div className="Column"> <h1>Done</h1> <hr width="70%" />
          <CompleteTaskColumn />
          </div>
        </div>
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapProps = (state) => ({
  newTasks: state.newTasks,
  progressTasks: state.progressTasks,
  doneTasks: state.doneTasks
})
const mapDispatch = (dispatch) => {
  return {
    submitHandler(name) {
      dispatch(addBoardThunk(name))
    },
    submitTask(name){
      addTaskThunk(name)
    },
    onGetTasks(){
      dispatch(initNewTasksThunk())
      dispatch(initDoneTasksThunk())
      dispatch(initProgressTasksThunk())
    }
  }
}

export default connect(mapProps, mapDispatch)(UserHome)

