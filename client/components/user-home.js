import React, { Component } from 'react'
import {connect} from 'react-redux'
import Dragula from 'react-dragula'
import NewTaskColumn from './newTaskColumn'
import InProgressTaskColumn from './InProgressTaskColumn'
import CompleteTaskColumn from './CompleteTaskColumn'
import AddTaskModal from './addTask'
import { initMembersThunk, addTaskThunk, initNewTasksThunk, initDoneTasksThunk, initProgressTasksThunk, setBoard, watchMemberAdd, initTickerTasksThunk, watchTickerTaskAddedEvent } from '../store'
import drake from '../drake'
import history from '../history'
/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentWillMount() {
    this.props.initBoard(this.props.match.params.id)
  }
  componentDidMount() {
    this.props.onGetTasks(this.props.board);
  }

  count(email){
    return this.props.ticker.filter(task => task.email === email).length
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
          <div className="Column">
            <div id="ticker">
              <h1> Task Ticker </h1>
              <hr width="70%" />
              {this.props.ticker.slice(-4).map((item, idx) => <h5 key={idx}>{item.task} completed by {item.email} </h5>)}
            </div>
            <div id="scoreBoard">
              <h1> Score Board </h1>
              <hr width="70%" />
              {this.props.members.map(member => <h5 key={member}>{member} {this.count(member)} </h5>)}
            </div>
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
  ticker: state.ticker,
  members: state.boardMembers,
  board: state.board,
  newTasks: state.newTasks,
  progressTasks: state.progressTasks,
  doneTasks: state.doneTasks
})
const mapDispatch = (dispatch, ownProps) => {
  watchMemberAdd(ownProps.match.params.id, dispatch)
  watchTickerTaskAddedEvent(ownProps.match.params.id, dispatch)
  return {
    initBoard(id) {
      dispatch(setBoard(id))
      dispatch(initMembersThunk(id))
      dispatch(initTickerTasksThunk(id))
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

