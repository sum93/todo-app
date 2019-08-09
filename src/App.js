import React, { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { observer } from 'mobx-react'

import './App.scss'
import StatusIndicator from './components/StatusIndicator/StatusIndicator'
import Todo from './components/Todo/Todo'
import TodoForm from './components/TodoForm/TodoForm'
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
          <div className="app--container">
            <UndoneSwitch isSet={state.onlyUndone} toggle={toggleOnlyUndone} />
            <TransitionGroup>
              {todoState.todos.filter(unreadFilter).map(todo => (
                <CSSTransition key={todo.id} timeout={1000}>
                  <Todo
                    todo={todo}
                    deleteTodo={() => todoState.deleteTodo(todo.id)}
                    editMessage={message => todo.setUpdatedMessage(message)}
                    toggleCompleteness={() => todo.toggleCompleteness()}
                    updateMessage={updatedMessage =>
                      todo.updateMessage(updatedMessage)
                    }
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
            <StatusIndicator
              isBusy={todoState.addingTodo}
              isEditing={state.editingNewTodo}
            >
              <TodoForm
                onBlur={unsetEditingTodo}
                onFocus={setEditingTodo}
                onSubmit={event => todoState.createTodo(event)}
                placeholder="Add new todo..."
              />
            </StatusIndicator>
          </div>
        )}
      </main>
    </div>
  )
})

export default App
