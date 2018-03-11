import React, { Component } from 'react'
import {connect} from 'react-redux'
import Dragula from 'react-dragula'
import NewTaskColumn from './newTaskColumn'
import InProgressTaskColumn from './InProgressTaskColumn'
import CompleteTaskColumn from './CompleteTaskColumn'
import AddTaskModal from './addTask'
import { addBoardThunk, addTaskThunk, initNewTasksThunk, initDoneTasksThunk, initProgressTasksThunk } from '../store'
import drake from '../drake'
/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount() {
    this.props.onGetTasks(this.props.board);
  }
  render() {

    return (
      <div>
        <AddTaskModal board={this.props.board} submitHandler={this.props.submitTask} open={false} />
        <div className="flex" id="home">
          <div className="Column"> <h1>Not Started</h1> <hr width="70%" />
            <NewTaskColumn board={this.props.board} />
          </div>
          <div className="Column"> <h1>In Progress</h1> <hr width="70%" />
          <InProgressTaskColumn board={this.props.board} />
          </div>
          <div className="Column"> <h1>Done</h1> <hr width="70%" />
          <CompleteTaskColumn board={this.props.board} />
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
  board: state.board,
  newTasks: state.newTasks,
  progressTasks: state.progressTasks,
  doneTasks: state.doneTasks
})
const mapDispatch = (dispatch) => {
  return {
    submitHandler(name) {
      dispatch(addBoardThunk(name))
    },
    submitTask(board, name){
      addTaskThunk(board, name)
    },
    onGetTasks(board){
      dispatch(initNewTasksThunk(board))
      dispatch(initDoneTasksThunk(board))
      dispatch(initProgressTasksThunk(board))
    }
  }
}

export default connect(mapProps, mapDispatch)(UserHome)

