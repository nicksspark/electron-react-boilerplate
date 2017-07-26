import React, {Component} from 'react';
import {login} from '../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';
import CSSstyles from './LoginPage.css';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
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
      <div className={CSSstyles.container}>
        <div>
          <img src='../../../CreativeCloudFiles/Asset 2.png'/>
        </div>
        <div>
          <form onSubmit={(e) => this.onLogin(e)}>
            <TextField
              hintText=""
              floatingLabelText="Username"
              value={this.state.username}
              onChange={(e) => {this.usernameChange(e)}}
            /><br />
            <TextField
              hintText=""
              floatingLabelText="Password"
              value={this.state.password}
              onChange={(e) => {this.passwordChange(e)}}
            /><br />
            <RaisedButton type='submit' label="Primary" primary={true} style={JSstyles.submit} />
          </form>
          <Link to='/register'>Register</Link>
        </div>
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

const JSstyles = {
  submit: {
    margin: 12,
  }
};
