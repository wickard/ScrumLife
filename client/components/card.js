import React from "react";
import { Button, Dropdown, Form } from "semantic-ui-react"
import { addTickerTaskThunk, watchTickerTaskAddedEvent, initTickerTasksThunk } from '../store'
import { connect } from 'react-redux'

function Card(props) {
    const options = props.members.map(user => {
      return {name: user, value: user, text: user}
    })
    let owner = null;
    return (
      <div className='card' id={props.id} task={props.task}>
        <div id="cardTask">
          {props.children}
        </div>
        <Form onSubmit={(e, data) => {
          e.preventDefault();
          props.completeTask(props.board, props.task, owner)
          props.removeTask()
        }}>
        <div id= "cardButtons">
          <Dropdown
          onChange={(e, { value }) => {owner = value}}
          name="user"
          selection
          options={options}
          placeholder='Choose a user'
        />
        <Button onClick={props.removeTask} basic color="red"> remove </Button>
          <Button type="submit" basic color="purple"> Complete </Button>
        </div>
        </Form>
      </div>
    )
}

const mapProps = state => ({
  board: state.board
})

const mapDispatch = (dispatch) => {
  return {
    completeTask(board, task, email){
      addTickerTaskThunk(board, task, email)
    }
  }
}

export default connect(mapProps, mapDispatch)(Card)
