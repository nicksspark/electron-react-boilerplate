import React, {Component} from 'react';
import {register} from '../actions/index';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { login } from '../actions/index';
import { Redirect } from 'react-router';

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
    this.onSubmit = this.onSubmit.bind(this);

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
  onSubmit(e) {
    e.preventDefault();
    const props = this.props;
    axios.post('http://localhost:3000/register', this.state)
    .then((res) => {
      console.log('register attempted');
      console.log(res);
      if (res.data.success) {
        console.log('registered');
        axios.post('http://localhost:3000/login', {
          username: this.state.username,
          password: this.state.password
        })
        .then((resp) => {
          console.log('login attempted');
          if (resp.data.success) {
            console.log('logged in', resp.data);
            console.log('props', props);
            props.login(resp.data.user, resp.data.token);
          }
        })
        .catch((err) => {
          console.log('ERR', err);
        });
      } else {
        alert(res.data.error);
      }
    })
    .catch((err) => {
      console.log('ERR', err);
    });
  }
  render() {
    console.log('im in register');
    console.log('token', this.props.token);
    if (this.props.token) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <form onSubmit={(e) => {this.onSubmit(e)}}>
          <input type='text' placeholder='Username' value={this.state.username} onChange={(e) => {this.usernameChange(e)}}/>
          <input type='text' placeholder='Password' value={this.state.password} onChange={(e) => {this.passwordChange(e)}}/>
          <input type='text' placeholder='First Name' value={this.state.fname} onChange={(e) => {this.fnameChange(e)}}/>
          <input type='text' placeholder='Last Name' value={this.state.lname} onChange={(e) => {this.lnameChange(e)}}/>
          <input type='text' placeholder='Email' value={this.state.email} onChange={(e) => {this.emailChange(e)}}/>
          <button type='submit'>Register</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.reducer.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(login(username, password))
    }
  };
};

RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export default RegisterPage;
