import React                      from 'react';
import ReactDOM                   from 'react-dom';
import { Provider }               from 'react-redux';
import { createStore }            from 'redux';
import { Container, Form, Input } from 'semantic-ui-react';
import { Header, Icon }           from 'semantic-ui-react';
import { Grid , Button, List }    from 'semantic-ui-react';
import { bindActionCreators }     from 'redux';
import { connect }                from 'react-redux';
import * as TodoActions           from '../actions';



// class to handle todoitem actions
class TodoItem extends React.Component {
  
  constructor(){
    super()
  }

  onDeleteClick(){
    this.props.deleteTodo(this.props.index);
  }

  onCompletedClick(){
    this.props.completeTodo(this.props.index)
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


const mapDispatchToProps = dispatch => {
  return bindActionCreators(TodoActions, dispatch)
}

export default connect(mapDispatchToProps)(TodoItem);