import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3001/todo'
})

const todoParser = todo => ({
  completed: todo.completed,
  message: todo.message
})

const getTodos = () => client.get('/')

const createTodo = message => client.post('/', { data: { message } })

const removeTodo = id => client.delete(`/${id}`)

const updateTodo = (id, todo) =>
  client.patch(`/${id}`, { data: { todo: todoParser(todo) } })

const removeDone = () => client.delete('/')

export default {
  getTodos,
  createTodo,
  removeTodo,
  updateTodo,
  removeDone
}
