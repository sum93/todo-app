import { observable } from 'mobx'

import TodoService from './TodoService'
import { doneCountReducer, hasDoneReducer, notCompletedFilter } from './utils'

const createTodo = todo =>
  observable({
    id: todo._id,
    message: todo.message,
    completed: todo.completed,
    busy: false,
    setBusy: function(busy) {
      this.busy = busy
    },
    setCompleted: function(completed) {
      this.completed = completed
    },
    setMessage: function(message) {
      this.message = message
    },
    toggleCompleteness: function() {
      this.setBusy(true)
      this.setCompleted(!this.completed)
      this.updateTodo()
    },
    updateMessage: function(updatedMessage) {
      this.setBusy(true)
      this.setMessage(updatedMessage)
      this.updateTodo()
    },
    updateTodo: function() {
      TodoService.updateTodo(this.id, this).then(() => {
        this.setBusy(false)
      })
    }
  })

const todoState = observable({
  busyCreating: false,
  busyRemovingDone: false,
  loading: false,
  todos: [],
  get hasDone() {
    return this.todos.reduce(hasDoneReducer, false)
  },
  fetchTodos: function() {
    this.loading = true
    TodoService.getTodos().then(res => {
      this.todos = res.data.map(todo => createTodo(todo))
      this.loading = false
    })
  },
  createTodo: function(event) {
    this.busyCreating = true

    event.persist()
    TodoService.createTodo(event.target.firstChild.value).then(res => {
      event.target.firstChild.value = ''
      this.todos.push(createTodo(res.data))
      this.busyCreating = false
    })

    event.preventDefault()
  },
  deleteTodo: function(id) {
    this.todos.find(todo => id === todo.id).setBusy(true)
    TodoService.removeTodo(id).then(res => {
      if (res.data) {
        this.todos = this.todos.filter(todo => {
          return todo.id !== id
        })
      } else {
        this.todos.find(todo => id === todo.id).setBusy(false)
      }
    })
  },
  removeDone: function() {
    this.busyRemovingDone = true
    const toDeleteTodoCount = this.todos.reduce(doneCountReducer, 0)
    TodoService.removeDone()
      .then(res => {
        if (res.data === toDeleteTodoCount) {
          this.todos = this.todos.filter(notCompletedFilter)
        }
      })
      .finally(() => {
        this.busyRemovingDone = false
      })
  }
})

export default todoState
