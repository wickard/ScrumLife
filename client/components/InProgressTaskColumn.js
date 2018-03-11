import React, { Component } from 'react'
import dragula from 'react-dragula'
import  drake  from '../drake'
import Card from './card'
import { connect } from 'react-redux'
import { removeProgressTaskThunk, watchProgressTaskAddedEvent, watchProgressTaskRemovedEvent } from '../store'

const mapProps = (state) => {
  return {
    tasks: state.inProgress,
    board: state.board
  }
}
const mapDispatch = (dispatch, ownProps) => {
  watchProgressTaskAddedEvent(ownProps.board, dispatch)
  watchProgressTaskRemovedEvent(ownProps.board, dispatch)
  return {
    removeTask(board, task) {
      removeProgressTaskThunk(board, task)
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
            <div id="Progress-Task" className="cardholder" ref={this.dragulaDecorator}>
            {this.props.tasks.map((task, idx) => {
              return (
                <Card className={task.name} key={task.id} id={task.id} task={task.name} removeTask={() => this.props.removeTask(this.props.board, task.id)}>
                  {task.name}
                </Card>
              )
            }) }
            </div>
    )
  }
}
