import React, { Component } from 'react'
import dragula from 'react-dragula'
import  drake  from '../drake'
import Card from './card'
import { connect } from 'react-redux'
import { removeTask } from '../store'

const mapProps = (state) => {
  return {
    tasks: state.inProgress
  }
}
const mapDispatch = (dispatch) => ({
  removeTask(task) {
    dispatch(removeTask(task))
  }
})

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
                <Card className={task} key={idx} task={task} removeTask={() => this.props.removeTask(task)}>
                  {task}
                </Card>
              )
            }) }
            </div>
    )
  }
}
