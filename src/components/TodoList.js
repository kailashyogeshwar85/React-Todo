import React 											from 'react';
import ReactDOM 									from 'react-dom';
import { Provider } 							from 'react-redux';
import { createStore } 						from 'redux';
import { Container, Form, Input } from 'semantic-ui-react';
import { Header, Icon }						from 'semantic-ui-react';
import { Grid , Button, List } 		from 'semantic-ui-react';
import TodoItem										from './TodoItem.js';
import { bindActionCreators }			from 'redux';
import { connect }								from 'react-redux';
import * as TodoActions           from '../actions';

class TodoList extends React.Component {

	// componentWillMount
	componentWillReceiveProps(nextProps) {
		console.log('next props received ',nextProps);
	}
	// dispatch is available because no mapDispatchToProps called
	render() {
		console.log('rendering todo list',this.props.todo.items);
		let items = [];
		this.props.todo.items.forEach((item, index) => {
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

const mapStateToProps = state => {
	console.log('list map');
	return { todo : state.todos.todo }
}

export default connect(mapStateToProps)(TodoList);