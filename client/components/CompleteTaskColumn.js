import React, { Component } from 'react'
import dragula from 'react-dragula'
import  drake  from '../drake'
import Card from './card'
import { connect } from 'react-redux'
import { watchDoneTaskAddedEvent, watchDoneTaskRemovedEvent, removeDoneTaskThunk } from '../store'

const mapProps = (state) => {
  return {
    tasks: state.done,
    board: state.board,
    members: state.boardMembers
  }
}
const mapDispatch = (dispatch, ownProps) => {
  watchDoneTaskAddedEvent(ownProps.board, dispatch)
  watchDoneTaskRemovedEvent(ownProps.board, dispatch)
  return {
    removeTask(board, task) {
      removeDoneTaskThunk(board, task)
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
                <Card board={this.props.board} members={this.props.members} className={task.name} key={task.id} id={task.id} task={task.name} removeTask={() => this.props.removeTask(this.props.board, task.id)}>
                  {task.name}
                </Card>
              )
            }) }
            </div>
    )
  }
}
