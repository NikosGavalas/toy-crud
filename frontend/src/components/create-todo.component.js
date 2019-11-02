import React, { Component } from 'react';
import axios from 'axios';

import CONF from '../conf';
import COMMON from '../common';

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    // bind methods to this
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeResponsible = this.onChangeResponsible.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // initialize state
    this.state = {
      description: '',
      responsible: '',
      priority: '',
      completed: false
    }

    this.addNewURL = `${CONF.API_BASE}/add`
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeResponsible(e) {
    this.setState({
      responsible: e.target.value
    });
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('Form submitted: ');
    console.log(`\tDescription: ${this.state.description}`);
    console.log(`\tResponsible: ${this.state.responsible}`);
    console.log(`\tPriority: ${this.state.priority}`);

    const newTodo = {
      description: this.state.description,
      responsible: this.state.responsible,
      priority: this.state.priority,
      completed: this.state.completed
    }

    // TODO: add authentication
    axios.post(this.addNewURL, newTodo)
      .then(res => {
        console.log(res.data);
      });

    this.setState({
      description: '',
      responsible: '',
      priority: '',
      completed: false
    })
  }

  render() {
    return (
      <div>
        <h2>Create new Todo</h2>

        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Description</label>
            <input  type='text'
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    placeholder='Placeholder lol'
                    />
          </div>

          <div className='form-group'>
            <label>Responsible</label>
            <input  type='text'
                    className='form-control'
                    value={this.state.responsible}
                    onChange={this.onChangeResponsible}
                    />
          </div>

          <div className='form-group'>
            <div className='form-check form-check-inline'>
              <input  type='radio'
                      className='form-check-input'
                      name='priorityOpts'
                      id='priorityLow'
                      value={COMMON.PRIORITY.LOW}
                      onChange={this.onChangePriority}
                      checked={this.state.priority === COMMON.PRIORITY.LOW}
                      />
              <label className='form-check-label'>{COMMON.PRIORITY.LOW}</label>
            </div>

            <div className='form-check form-check-inline'>
              <input  type='radio'
                      className='form-check-input'
                      name='priorityOpts'
                      id='priorityMedium'
                      value={COMMON.PRIORITY.MEDIUM}
                      onChange={this.onChangePriority}
                      checked={this.state.priority === COMMON.PRIORITY.MEDIUM}
                      />
              <label className='form-check-label'>{COMMON.PRIORITY.MEDIUM}</label>
            </div>

            <div className='form-check form-check-inline'>
              <input  type='radio'
                      className='form-check-input'
                      name='priorityOpts'
                      id='priorityHigh'
                      value={COMMON.PRIORITY.HIGH}
                      onChange={this.onChangePriority}
                      checked={this.state.priority === COMMON.PRIORITY.HIGH}
                      />
              <label className='form-check-label'>{COMMON.PRIORITY.HIGH}</label>
            </div>
          </div>

          <div className='form-group' style={{marginTop: 10}}>
            <input type='submit' className='btn btn-primary' value='Submit'/>
          </div>
        </form>
      </div>
    )
  }
}
