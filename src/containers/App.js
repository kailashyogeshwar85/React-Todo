import React 											from 'react';
import ReactDOM 									from 'react-dom';
import { Provider } 							from 'react-redux';
import { createStore } 						from 'redux';
import { Container, Form, Input } from 'semantic-ui-react';
import { Header, Icon }						from 'semantic-ui-react';
import { Grid , Button, List } 		from 'semantic-ui-react';
import AddTodoForm 								from '../components/AddTodoForm';
import TodoItem										from '../components/TodoItem';
import TodoList										from '../components/TodoList';
//Root component

class App extends React.Component{

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


// connect everything
export default App;