import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

import COMMON from '../common';

export default class EditTodo extends Component {

  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeResponsible = this.onChangeResponsible.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeCompleted = this.onChangeCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: '',
      responsible: '',
      priority: '',
      completed: false,

      redirect: false
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:4000/api/v1/' + this.props.match.params.id)
      .then(resp => {
        this.setState({
          description: resp.data.description,
          responsible: resp.data.responsible,
          priority: resp.data.priority,
          completed: resp.data.completed
        })
      })
      .catch(err => {
        console.log(err);
      })
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
    });
  }

  onChangeCompleted(e) {
    this.setState({
      completed: !this.state.completed
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      description: this.state.description,
      responsible: this.state.responsible,
      priority: this.state.priority,
      completed: this.state.completed
    };

    console.log(obj);

    axios.post('http://127.0.0.1:4000/api/v1/update/' + this.props.match.params.id, obj)
      .then(res => {
        console.log(res.data);
        this.setState({redirect: true})
      })
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/'/>;
    }

    return (
      <div>
        <h2>Update Todo</h2>

        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Description</label>
            <input  type='text'
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChangeDescription}
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

          <div className='form-check'>
            <input  className='form-check-input'
                    id='completedCheckbox'
                    type='checkbox'
                    name='completedCheckbox'
                    onChange={this.onChangeCompleted}
                    checked={this.state.completed}
                    value={this.state.completed}
                    />
            <label className='form-check-label' htmlFor='completedCheckbox'>Completed</label>
          </div>

          <div className='form-group' style={{marginTop: 10}}>
            <input type='submit' className='btn btn-primary' value='Submit'/>
          </div>
        </form>
      </div>
    )
  }
}
