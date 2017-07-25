import React, {Component} from 'react';
import {login} from '../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }
  usernameChange(e) {
    e.preventDefault();
    this.setState({
      username: e.target.value
    });
  }
  passwordChange(e) {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  }
  onLogin(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      if (res.data.success) {
        this.props.login(res.data.user, res.data.token);
      }
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
  }

  render() {
    console.log('im in login');
    console.log('token', this.props.token);

    if (this.props.token) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <form onSubmit={(e) => this.onLogin(e)}>
          <input type='text' placeholder='Username' value={this.state.username} onChange={(e) => {this.usernameChange(e)}}/>
          <input type='text' placeholder='Password' value={this.state.password} onChange={(e) => {this.passwordChange(e)}}/>
          <button type='submit'>Login</button>
        </form>
        <Link to='/'>Home</Link>
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

LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginPage;
