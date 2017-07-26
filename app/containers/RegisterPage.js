import React, {Component} from 'react';
import {register} from '../actions/index';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { login } from '../actions/index';
import { Redirect } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CSSstyles from './RegisterPage.css';
class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      fname: '',
      lname: '',
      email: '',
      login: false,
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
  onLogin() {
    this.setState({
      login: true
    });
  }
  render() {
    console.log('im in register');
    console.log('token', this.props.token);
    if (this.props.token) {
      return <Redirect to='/' />;
    }
    if (this.state.login) {
      return <Redirect to= '/login' />;
    }
    return (
        <h1> Word Farm </h1>
        <h3> Register </h3>
        <form onSubmit={(e) => {this.onSubmit(e)}}>
          <div className={CSSstyles.container}>
          <div className={CSSstyles.formContainer}>
          <TextField
            value={this.state.fname}
            floatingLabelText="First Name"
            onChange={(e) => {this.fnameChange(e)}}
          /><br />
          <TextField
            value={this.state.lname}
            floatingLabelText="Last Name"
            onChange={(e) => {this.lnameChange(e)}}
          /><br />
          <TextField
            value={this.state.username}
            floatingLabelText="Username"
            onChange={(e) => {this.usernameChange(e)}}
          /><br />
          <TextField
            value={this.state.email}
            floatingLabelText="Email"
            onChange={(e) => {this.emailChange(e)}}
          /><br />
            <TextField
              value={this.state.password}
              type="password"
              floatingLabelText="Password"
              onChange={(e) => {this.passwordChange(e)}}
            /><br />
            </div>
          </div>
            <RaisedButton type="submit" label="Register" primary={true}/>
            <RaisedButton className= {CSSstyles.inlineButtons} label="Login" secondary={true} onClick= {() => {this.onLogin()}}/>
        </form>
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
