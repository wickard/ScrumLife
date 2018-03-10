import React, { Component } from 'react'
import dragula from 'react-dragula'
import  drake  from '../drake'
import Card from './card'
import { connect } from 'react-redux'
import { removeTask, watchDoneTaskAddedEvent, watchDoneTaskRemovedEvent, removeDoneTaskThunk } from '../store'

const mapProps = (state) => {
  return {
    tasks: state.done
  }
}
const mapDispatch = (dispatch) => {
  watchDoneTaskAddedEvent(dispatch)
  watchDoneTaskRemovedEvent(dispatch)
  return {
    removeTask(task) {
      removeDoneTaskThunk(task)
    }
  }
}

@connect(mapProps, mapDispatch)
export default class NewTaskColumn extends Component {

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      drake.containers.push(componentBackingInstance)
    }
  };
  render() {
    return (
            <div id="Complete-Task" className="cardholder" ref={this.dragulaDecorator}>
            {this.props.tasks.map((task, idx) => {
              return (
                <Card className={task.name} key={task.id} id={task.id} task={task.name} removeTask={() => this.props.removeTask(task.id)}>
                  {task.name}
                </Card>
              )
            }) }
            </div>
    )
  }
}
