//Actions are Commands to reducer to change the state 
export const addTodo = (message) => {
  return {
    type: 'ADD_TODO',
    message: message,
    complete: false
  }
}

export const completeTodo = (index) => {
  return {
    type: 'COMPLETE_TODO',
    index: index
  }
}

export const deleteTodo = (index) => {
  return {
    type: 'DELETE_TODO',
    index: index
  }
}

export const clearTodo = () => {
  return {
    type: 'CLEAR_TODO'
  }
}