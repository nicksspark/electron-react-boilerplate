import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import { Redirect } from 'react-router';
import axios from 'axios';

class ReadPage extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    console.log('component is mounting.....');
    console.log('token', this.props.token);
    const path = this.props.path;
    const bookId = path.split('/')[2];
    axios.get('http://localhost:3000/read/' + bookId, {
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
    .then((res) => {
      console.log(res);
      this.setState({
        book: res.book
      });
    })
    .catch((err) => {
      console.log('ERR', err);
    })
  }
  render() {
    if (!this.props.token) {
      return <Redirect to='/login' />;
    }
    const book = this.state.book;
    return (
      <div>
        {book.title}
        {book.author}
        {book.text}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.reducer.user,
    token: state.reducer.token,
    path: state.router.location.pathname
  }
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

ReadPage = connect(mapStateToProps, mapDispatchToProps)(ReadPage);

export default ReadPage;
