import React, {Component} from 'react';
import {login} from '../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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
    console.log(this.state.username);
  }
  passwordChange(e) {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={() => {this.props.login(this.state.username, this.state.password)}}>
          <input type='text' placeholder='Username' value={this.state.username} onChange={(e) => {this.usernameChange(e)}}/>
          <input type='text' placeholder='Password' value={this.state.password} onChange={(e) => {this.passwordChange(e)}}/>
          <button type='submit'>Login</button>
        </form>
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(login(username, password))
    }
  }
}

LoginPage = connect(null, mapDispatchToProps)(LoginPage);

export default LoginPage;
