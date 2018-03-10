import React, { Component } from 'react'
import dragula from 'react-dragula'
import  drake  from '../drake'
import { connect} from 'react-redux'
import { removeTaskThunk } from '../store'
import Card from './card'

const mapProps = (state) => {
  return {
    newTasks: state.newTasks
  }
}
const mapDispatch = (dispatch) => ({
  removeTask(id) {
    removeTaskThunk(id)
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
            <div id="New-Task" className="cardholder" ref={this.dragulaDecorator}>
            {this.props.newTasks.map((task, idx) => {
              return (
                <Card className={task.name} key={idx} task={task.name} removeTask={() => this.props.removeTask(task.id)}>
                  {task.name}
                </Card>
              )
            }) }
            </div>
    )
  }
}

