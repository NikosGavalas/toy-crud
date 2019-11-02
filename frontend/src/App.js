import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import TodosList from './components/todos-list.component'; 
import EditTodo from './components/edit-todo.component'; 
import CreateTodo from './components/create-todo.component';

import toothbrush from './toothbrush.png';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>

          <h2>React CRUD App</h2>

          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <Link to='/' className='navbar-brand'>
              <img src={toothbrush} width='50' height='50' alt='Toothbrush' />
            </Link>
            <div className='collapse navbar-collapse'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item active'>
                  <Link to='/' className='nav-link'>Todos</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/create' className='nav-link'>Create</Link>
                </li>
              </ul>
            </div>
          </nav>

          <br/>

          <Route path='/' exact component={TodosList}/>
          <Route path='/edit/:id' component={EditTodo}/>
          <Route path='/create' component={CreateTodo}/>
        </div>
      </Router>
    );
  }
}

export default App;
