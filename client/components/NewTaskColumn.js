import React, { Component } from 'react'
import dragula from 'react-dragula'
import  drake  from '../drake'
import { connect} from 'react-redux'
import { removeTaskThunk, watchTaskAddedEvent, watchTaskRemovedEvent } from '../store'
import Card from './card'

const mapProps = (state) => {
  return {
    newTasks: state.newTasks
  }
}
const mapDispatch = (dispatch, ownProps) => {
  watchTaskAddedEvent(ownProps.board, dispatch)
  watchTaskRemovedEvent(ownProps.board, dispatch)
  return {
    removeTask(id) {
      removeTaskThunk(id)
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
            <div id="New-Task" className="cardholder" ref={this.dragulaDecorator}>
            {this.props.newTasks.map((task) => {
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

