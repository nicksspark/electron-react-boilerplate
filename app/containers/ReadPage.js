import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import { Redirect } from 'react-router';
import axios from 'axios';
import { loaded } from '../actions/index';
import styles from './css/styles.css';
import { Link } from 'react-router-dom';
import CSSstyles from './LoginPage.css';

class ReadPage extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    console.log('component is mounting.....');
    console.log('token', this.props.token);
    const path = this.props.path;
    console.log('path', path);
    const bookId = path.split('/')[2];
    console.log('bookId', bookId);
    axios.get('http://localhost:3000/read/' + bookId, {
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
    .then((res) => {
      console.log('RES', res);
      this.setState({
        book: res.data.book
      });
      this.props.loaded();
    })
    .catch((err) => {
      console.log('ERR', err);
    })
  }
  onHome() {
    this.props.loaded();
  }
  render() {
    if (!this.props.token) {
      return <Redirect to='/login' />;
    }
    const book = this.state.book;
    const loading = this.props.loading;
    return (!loading &&
      <div>
        <Link className={styles.btn} to="/" onClick={() => {this.onHome()}}>Home</Link>
        <div>
          <div>
            {book.title}
          </div>
          <div>
            {book.author}
          </div>
          <div>
            {book.text}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.reducer.user,
    token: state.reducer.token,
    path: state.router.location.pathname,
    loading: state.loading.loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loaded: () => {
      dispatch(loaded())
    }
  };
};

ReadPage = connect(mapStateToProps, mapDispatchToProps)(ReadPage);

export default ReadPage;
