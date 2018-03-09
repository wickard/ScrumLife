import React, { Component } from 'react'
import {connect} from 'react-redux'
import Dragula from 'react-dragula'
import NewTaskColumn from './newTaskColumn'
import InProgressTaskColumn from './InProgressTaskColumn'
import CompleteTaskColumn from './CompleteTaskColumn'
import { addNewTask } from '../store'
import AddTaskModal from './addTask'
import Card from './card'
/**
 * COMPONENT
 */
export class UserHome extends Component {
  // dragulaDecorator = (componentBackingInstance) => {
  //   if (componentBackingInstance) {
  //     let options = { };
  //     Dragula([componentBackingInstance, ...document.querySelectorAll('.cardholder')], options);
  //   }
  // };
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
const mapState = (state) => {
  return {
    newTasks: state.newTasks
  }
}

const mapDispatch = (dispatch) => ({
  addTask(task) {
    dispatch(addNewTask(task))
  },
  removeTask(task) {
    dispatch(removeTask(task))
  }
})

export default connect(mapState, mapDispatch)(UserHome)

