import React from "react";
import { Button } from "semantic-ui-react"

export default function Card(props) {
    return (
      <div className='card blue' id={props.task} value="walue">
        {props.children}
        <Button onClick={props.removeTask} color="red">Remove</Button>
      </div>
    )
}
