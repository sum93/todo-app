import React, { useEffect, useState } from 'react'

import './App.css'
import BorderWrapper from './BorderWrapper'
import Todo from './Todo'
import { observer } from 'mobx-react'

const App = observer(({ todoState }) => {
  const [state, setState] = useState({
    editingNewTodo: false
  })

  useEffect(() => {
    todoState.fetchTodos()
  }, [todoState])

  const setEditingTodo = () => {
    setState(state => ({ ...state, editingNewTodo: true }))
  }

  const unsetEditingTodo = () => {
    setState(state => ({ ...state, editingNewTodo: false }))
  }

  return (
    <div className="app">
      <header className="app--header">Todos App</header>
      <main className="app--main">
        {todoState.loading ? (
          'Loading...'
        ) : (
          <React.Fragment>
            {todoState.todos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={() => todoState.deleteTodo(todo.id)}
                editMessage={message => todo.setUpdatedMessage(message)}
                toggleCompleteness={() => todo.toggleCompleteness()}
                updateMessage={updatedMessage =>
                  todo.updateMessage(updatedMessage)
                }
              />
            ))}
            <BorderWrapper
              isBusy={todoState.addingTodo}
              isEditing={state.editingNewTodo}
            >
              <form
                className="todo--form"
                onSubmit={event => todoState.createTodo(event)}
              >
                <input
                  className="todo--input"
                  onBlur={unsetEditingTodo}
                  onFocus={setEditingTodo}
                  placeholder="Add new todo..."
                />
              </form>
            </BorderWrapper>
          </React.Fragment>
        )}
      </main>
    </div>
  )
})

export default App
