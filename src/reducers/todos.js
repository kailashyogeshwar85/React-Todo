// main reducer
//reducer function to handle action dispatched
 import _ from 'lodash'; 

const defaultState = {
  todo: {
    items: [{
      message: 'jQuery',
      completed: false
    }]
  },
  message: ''
};

const todos  = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TODO' :
      var newState = _.cloneDeep(state); // Object.assign will not work more than one level deep
      newState.todo.items.push({
        message: action.message,
        completed: false
      });
      console.log("new state ", newState)
      return newState;
    case 'DELETE_TODO':
      var items = [].concat(state.todo.items);
      items.splice(action.index, 1);
      return Object.assign({}, state, {
        todo: {
          items: items
        }
      });
    case 'COMPLETE_TODO':
      var newState = _.cloneDeep(state);
      newState.todo.items[action.index].completed = true;
      return newState;
    case 'CLEAR_TODO':
      return Object.assign({}, state, {
        todo: {
          items: []
        }
      });
    default:
      return state; 
  }
}

export default todos;