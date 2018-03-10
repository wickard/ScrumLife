import React, { Component } from 'react'
import {connect} from 'react-redux'
import Dragula from 'react-dragula'
import NewTaskColumn from './newTaskColumn'
import InProgressTaskColumn from './InProgressTaskColumn'
import CompleteTaskColumn from './CompleteTaskColumn'
import AddTaskModal from './addTask'
import { addBoardThunk, addTaskThunk, initNewTasksThunk, watchTaskAddedEvent, addNewTask, watchTaskRemovedEvent } from '../store'
/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount() {
    this.props.onGetTasks();
  }

  dragulaGoalDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  };
  render() {
    // const drake = Dragula()
    // drake.containers.push(document.getElementById('home'))
    // console.log(drake)
    return (
      <div>
        <AddTaskModal submitHandler={this.props.addTask} open={false} />
        <div className="flex" id="home">
          <div className="Column"> <h1>Goals</h1> <hr width="70%" />
            <div className="goal-container" ref={this.dragulaGoalDecorator}>
              <div className="card pink"></div>
              <div className="card black"></div>
              <div className="card blue"></div>
              <div className="card orange"></div>
            </div>
          </div>
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
  newTasks: state.newTasks
})
const mapDispatch = (dispatch) => {
  watchTaskAddedEvent(dispatch)
  watchTaskRemovedEvent(dispatch)
  return {
    submitHandler(name) {
      dispatch(addBoardThunk(name))
    },
    submitTask(name){
      dispatch(addTaskThunk(name))
    },
    onGetTasks(){
      dispatch(initNewTasksThunk())
    }
  }
}

export default connect(mapProps, mapDispatch)(UserHome)

