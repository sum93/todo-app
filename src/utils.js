export const hasDoneReducer = (acc, todo) => {
  return acc ? acc : todo.completed
}

export const doneIdReducer = (acc, todo) => {
  return todo.completed ? acc.concat([todo.id]) : acc
}

export const doneCountReducer = (acc, todo) => {
  return todo.completed ? acc + 1 : acc
}

export const notCompletedFilter = todo => {
  return !todo.completed
}
