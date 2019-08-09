import React from 'react'

import './TodoForm.scss'

const TodoForm = ({ inputRef, onSubmit, ...inputProps }) => (
  <form className="todo-form" onSubmit={onSubmit}>
    <input ref={inputRef} className="todo-form--input" {...inputProps} />
  </form>
)

export default TodoForm
