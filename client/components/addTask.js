import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

const options = [{ key: 'exercise', text: 'exercise', value: 'exercise'}, { key: 'Study', text: 'Study', value: 'Study'}
]

const addTaskModal = (props) => (
  <Modal closeIcon size="tiny" trigger={<Button>Add New Task</Button>}>
    <Modal.Header>Add New Task!</Modal.Header>
    <Modal.Content>
    <Form onSubmit={(e, data) => props.submitHandler(props.board, e.target.name.value)} size='small'>
        <Form.Group>
          <Form.TextArea className="task-field" fluid control='input' placeholder='New Task' name="name"  />
        </Form.Group>
        <Button type='submit'>Add Task</Button>
      </Form>
    </Modal.Content>

  </Modal>
)

export default addTaskModal
