import React                      from 'react';
import ReactDOM                   from 'react-dom';
import { Provider }               from 'react-redux';
import { createStore }            from 'redux';
import { Container, Form, Input } from 'semantic-ui-react';
import { Header, Icon }           from 'semantic-ui-react';
import { Grid , Button, List }    from 'semantic-ui-react';
import {bindActionCreators}       from 'redux';
import { connect }                from 'react-redux';
import * as TodoActions           from '../actions';


class AddTodoForm extends React.Component {
  
  constructor(){
    super();
    this.state = {
      message: ''
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.state.message);
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



const mapStateToProps = state => {
  console.log('form map');
  return { todo : state.todos.todo };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(TodoActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm);