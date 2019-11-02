import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
  <tr>
    <td className={props.todo.completed ? 'table-success completed-todo' : ''}>{ props.todo.description }</td>
    <td className={props.todo.completed ? 'table-success completed-todo' : ''}>{ props.todo.responsible }</td>
    <td className={props.todo.completed ? 'table-success completed-todo' : ''}>{ props.todo.priority }</td>
    <td className={props.todo.completed ? 'table-success' : ''}>
      <Link to={'/edit/' + props.todo._id }>Edit</Link>
    </td>
  </tr>
)

export default class TodosList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:4000/api/v1')
      .then(res => {
        this.setState({
          todos: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  todoList() {
    return this.state.todos.map(function(curr, i) {
      return <Todo todo={curr} key={i} />;
    })
  }

  render() {
    return (
      <div>
        <h2>Todos List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
    )
  }
}
