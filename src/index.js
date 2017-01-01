// main entry point for app

import React 											from 'react';
import ReactDOM 									from 'react-dom';
import { Provider } 							from 'react-redux';
import { createStore } 						from 'redux';
import { Container, Form, Input } from 'semantic-ui-react';
import { Header, Icon }						from 'semantic-ui-react';
import { Grid , Button, List } 		from 'semantic-ui-react';

const defaultState = {
	todo: {
		items: []
	}
};

//Actions Command to reducer to change the state 
const addTodo = (message) => {
	return {
		type: 'ADD_TODO',
		message: message,
		complete: false
	}
}

const completeTodo = (index) => {
	return {
		type: 'COMPLETE_TODO',
		index: index
	}
}

const deleteTodo = (index) => {
	return {
		type: 'DELETE_TODO',
		index: index
	}
}

const clearTodo = () => {
	return {
		type: 'CLEAR_TODO'
	}
}


//reducer function to handle action dispatched
const todoApp  = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO' :
			var newState = Object.assign({}, state);
			newState.todo.items.push({
				message: action.message,
				completed: false
			});
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
			var newState = Object.assign({}, state);
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


const store = createStore(todoApp, defaultState);


class AddTodoForm extends React.Component {
	
	constructor() {
		super()
		this.state = defaultState;
		this.state.message = '';
	}

	onFormSubmit(e) {
		e.preventDefault();
		store.dispatch(addTodo(this.state.message)); //dispatch add todo action
		this.setState({ message: ''});
	}			

	onMessageChanged(e){
		let message = e.target.value;
		this.setState({ message: message });
	}

	render(){
		return (
			<Form className='ui large form' onSubmit={this.onFormSubmit.bind(this)}>
				<Form.Field>
					<Input name="inputTodo" type='text' placeholder='Enter New Todo Task' 
						onChange = {this.onMessageChanged.bind(this)}
						value = {this.state.message}
						></Input>
				</Form.Field>
				<Form.Field>
					<Button className="ui primary button submit fluid">Add Task</Button>	
				</Form.Field>
			</Form>
		)
	}
}

// class to handle todoitem actions
class TodoItem extends React.Component {

	onDeleteClick(){
		store.dispatch(deleteTodo(this.props.index));
	}

	onCompletedClick(){
		store.dispatch(completeTodo(this.props.index));
	}


	// rendering list items
	render(){
		return (
			<List.Item>
				<List.Content floated="right">
					<Button onClick={this.onCompletedClick.bind(this)}>Done</Button>
					<Button onClick={this.onDeleteClick.bind(this)}>Delete</Button>
				</List.Content>
				<List.Content>
					<Header as="h4" textAlign="left" onClick={this.onCompletedClick.bind(this)} style={{textDecoration: this.props.completed ? 'line-through' : 'none', color: this.props.completed ? 'red' : ''}}>
						{this.props.message.trim()}
					</Header>
				</List.Content>
			</List.Item>			
		)
	}
}

class TodoList extends React.Component {

	// called just before component will be rendered
	// get the initial data
	constructor(){
		super();
		this.state = defaultState.todo;
	}
	componentWillMount(){
		store.subscribe(() => {
			this.state = store.getState();
			console.log("this.state.todo.items ",this.state.todo.items);
			this.setState({
				items: this.state.todo.items
			});				
		})
	}

	render() {
		console.log("render called")
		console.log(this.state)
		let items = [];
		this.state.items.forEach((item, index) => {
			items.push(
			<TodoItem
				key={ index }
				index = { index}
				message = { item.message }
				completed = { item.completed }
			/>)
		});

		if (!items.length) {
			return (
				<Header as="h4" textAlign="center"> You have no task yet. Add something to do. </Header>
			)
		}
		return (
			<List divided verticalAlign='middle'> {items} </List>
		)
	}
}

//Root component

class App extends React.Component{
	constructor(){
		super();
	}

	render(){
		return (
			<Grid textAlign ='center'>					
				<Grid.Column style={{ width: '500px', marginTop: '50px'}} >
					<Header as ="h3" textAlign="center"> My Todo App </Header>					
					<AddTodoForm />
					<TodoList />
				</Grid.Column>
			</Grid>
		)
	}
}
ReactDOM.render(
	<App />,
	document.getElementById('app')
)
