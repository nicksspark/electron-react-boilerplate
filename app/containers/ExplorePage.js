import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import { Redirect } from 'react-router';
import axios from 'axios';
import Book from '../components/Book';
import BookStream from '../components/BookStream';
import styles from './css/styles.css';
import RaisedButton from 'material-ui/RaisedButton';
import CSSstyles from './ExplorePage.css';

class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      home: false
    };
  }

  componentDidMount() {
    let books;
    axios.get('http://localhost:3000/explore', {
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
    .then((res) => {
      books = res.data.library;
      this.setState({
        books: books
      })
    })
    .catch((err) => {
      console.log('ERR', err);
    });
  }
  onHome() {
    this.setState({
      home: true
    });
  }
  render() {
    if (!this.props.token) {
      return <Redirect to='/login' />;
    }
    if (this.state.home) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <div className={CSSstyles.home}>
          <RaisedButton label="Home" onClick={() => {this.onHome()}}/>
        </div>
        <div className={CSSstyles.container}>
          <div className={CSSstyles.title}>Explore</div>
          <BookStream books={this.state.books} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.reducer.user,
    token: state.reducer.token,
    location: state.router
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

ExplorePage = connect(mapStateToProps, mapDispatchToProps)(ExplorePage);

export default ExplorePage;
