import React, {Component} from 'react';
import {register} from '../actions/index';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      fname: '',
      lname: '',
      email: ''
    }
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.fnameChange = this.fnameChange.bind(this);
    this.lnameChange = this.lnameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);

  }
  usernameChange(e) {
    e.preventDefault();
    this.setState({
      username: e.target.value
    });
    console.log(this.state.username);
  }
  passwordChange(e) {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  }
  fnameChange(e) {
    e.preventDefault();
    this.setState({
      fname: e.target.value
    });
  }
  lnameChange(e) {
    e.preventDefault();
    this.setState({
      lname: e.target.value
    });
  }
  emailChange(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  }
  onSubmit() {
    axios.post('/register', this.state)
    .then(() => {
      console.log('REGISTER TRIGGERED', this.state.fname, this.state.lname)
    })
    .catch((err) => {
      console.log('ERR', err);
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={() => {this.onSubmit()}}>
          <input type='text' placeholder='Username' value={this.state.username} onChange={(e) => {this.usernameChange(e)}}/>
          <input type='text' placeholder='Password' value={this.state.password} onChange={(e) => {this.passwordChange(e)}}/>
          <input type='text' placeholder='First Name' value={this.state.fname} onChange={(e) => {this.fnameChange(e)}}/>
          <input type='text' placeholder='Last Name' value={this.state.lname} onChange={(e) => {this.lnameChange(e)}}/>
          <input type='text' placeholder='Email' value={this.state.email} onChange={(e) => {this.emailChange(e)}}/>
          <button type='submit'>Register</button>
        </form>
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

export default RegisterPage;
