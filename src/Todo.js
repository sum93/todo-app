import React, { useCallback, useState } from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle as regularCheckCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faTrashAlt,
  faCheckCircle as solidCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react'

import BorderWrapper from './BorderWrapper'

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
    <BorderWrapper
      isBusy={todo.busy}
      isDone={todo.completed && !todo.busy}
      isEditing={state.editing && !todo.busy}
      onMouseEnter={setHovered}
      onMouseLeave={unsetHovered}
    >
      {state.editing ? (
        <form className="todo--form" onSubmit={event => submitEditing(event)}>
          <input
            ref={inputRef}
            className="todo--input"
            value={state.editedMessage}
            onChange={event => messageChange(event)}
            onBlur={event => submitEditing(event)}
          />
        </form>
      ) : (
        <span className="todo--span" onClick={setEditing}>
          {todo.message}
        </span>
      )}
      <div
        className={classnames('icon--wrapper', {
          'icon--wrapper__visible': state.hovered
        })}
      >
        <FontAwesomeIcon
          className="icon icon--check"
          icon={todo.completed ? solidCheckCircle : regularCheckCircle}
          size="lg"
          onClick={() => toggleCompleteness()}
        />
        <FontAwesomeIcon
          className="icon icon--delete"
          icon={faTrashAlt}
          size="lg"
          onClick={() => deleteTodo()}
        />
      </div>
    </BorderWrapper>
  )
})

export default Todo
