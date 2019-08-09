import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'

import './Todo.scss'
import StatusIndicator from '../StatusIndicator/StatusIndicator'
import TodoForm from '../TodoForm/TodoForm'
import TodoMenu from '../TodoMenu/TodoMenu'

const Todo = observer(props => {
  const { deleteTodo, todo, toggleCompleteness, updateMessage } = props

  const [state, setState] = useState({
    editedMessage: todo.message,
    editing: false,
    hovered: false
  })

  const setHovered = () => setState(state => ({ ...state, hovered: true }))
  const unsetHovered = () => setState(state => ({ ...state, hovered: false }))

  const setEditing = () => setState(state => ({ ...state, editing: true }))
  const unsetEditing = () => setState(state => ({ ...state, editing: false }))

  const submitEditing = event => {
    unsetEditing()
    if (state.editedMessage !== todo.message) {
      updateMessage(state.editedMessage)
    }
    event.preventDefault()
  }

  const messageChange = event => {
    const editedMessage = event.target.value
    setState(state => ({ ...state, editedMessage }))
  }

  const inputRef = useCallback(node => {
    if (node !== null) {
      node.focus()
    }
  }, [])

  return (
    <StatusIndicator
      isBusy={todo.busy}
      isDone={todo.completed}
      isEditing={state.editing}
      onMouseEnter={setHovered}
      onMouseLeave={unsetHovered}
    >
      {state.editing ? (
        <TodoForm
          inputRef={inputRef}
          onBlur={event => submitEditing(event)}
          onChange={event => messageChange(event)}
          onSubmit={event => submitEditing(event)}
          value={state.editedMessage}
        />
      ) : (
        <span className="todo--span" onClick={setEditing}>
          {todo.message}
        </span>
      )}
      <TodoMenu
        isCompleted={todo.completed}
        remove={() => deleteTodo()}
        shoudlBeVisible={state.hovered}
        toggleCompleteness={() => toggleCompleteness()}
      />
    </StatusIndicator>
  )
})

export default Todo
