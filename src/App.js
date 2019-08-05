import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import './App.css'
import BorderWrapper from './BorderWrapper'
import Todo from './Todo'
import UndoneSwitch from './components/UndoneSwitch/UndoneSwitch'

const App = observer(({ todoState }) => {
  const [state, setState] = useState({
    editingNewTodo: false,
    onlyUndone: false
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

  const toggleOnlyUndone = () => {
    setState(state => ({ ...state, onlyUndone: !state.onlyUndone }))
  }

  const unreadFilter = todo => {
    if (state.onlyUndone) {
      return !todo.completed
    }
    return true
  }

  return (
    <div className="app">
      <header className="app--header">Todos App</header>
      <main className="app--main">
        {todoState.loading ? (
          'Loading...'
        ) : (
          <React.Fragment>
            <UndoneSwitch isSet={state.onlyUndone} toggle={toggleOnlyUndone} />
            {todoState.todos.filter(unreadFilter).map(todo => (
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
