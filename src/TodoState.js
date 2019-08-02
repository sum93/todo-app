import { observable } from 'mobx'

import TodoService from './TodoService'

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
  addingTodo: false,
  loading: false,
  todos: [],
  fetchTodos: function() {
    this.loading = true
    TodoService.getTodos().then(res => {
      this.todos = res.data.map(todo => createTodo(todo))
      this.loading = false
    })
  },
  createTodo: function(event) {
    this.addingTodo = true

    event.persist()
    TodoService.createTodo(event.target.firstChild.value).then(res => {
      event.target.firstChild.value = ''
      this.todos.push(createTodo(res.data))
      this.addingTodo = false
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
  }
})

export default todoState
