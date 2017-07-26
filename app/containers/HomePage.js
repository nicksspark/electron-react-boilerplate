// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import BookStream from '../components/BookStream';
import axios from 'axios';
import styles from './css/styles.css';
import { logout } from '../actions/index';


class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      books: [
        // {
        //   title: 'Early Transcendentals',
        //   author: 'Stewart',
        //   image: 'https://images-na.ssl-images-amazon.com/images/I/51xUmFAz%2BVL._SX258_BO1,204,203,200_.jpg',
        //   id: '596fea7c734d1d6202a70d1f'
        // },
        // {
        //   title: 'Calculus',
        //   author: 'Anton, Bivens, Davis',
        //   image: 'https://prodimage.images-bn.com/pimages/9780470647691_p0_v2_s192x300.jpg',
        //   id: '2'
        // }
      ]
    };
  }
  componentDidMount() {
    axios.post('http://localhost:3000/', {
      id: this.props.user.id
      }, {
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
    .then((res) => {
      if (res.data.success) {
        this.setState({
          books: res.data.books
        });
        console.log('BOOKS', this.state.books);
      }
    })
    .catch((err) => {
      console.log('ERR', err);
    })
  }
  onLogout(e) {
    e.preventDefault();
    console.log('trying to log out');
    this.props.logout();
  }
  render() {
    console.log('im in home page');
    console.log('token', this.props.token);
    if (!this.props.token) {
      console.log('redirecting to login');
      return <Redirect to='/login' />;
    }
    return (
        <div>
          <div className={styles.container}>
            <div className={styles.btnGroup}>
              <Link className={styles.btn} to="/explore">Explore</Link>
              <button className={styles.btn} onClick={(e) => {this.onLogout(e)}}>Logout</button>
            </div>
          </div>
            <div>
              <h2 className={styles.user}>Welcome, {this.props.user.fname}</h2>
          </div>
          <div className={styles.container}>
          <h2 className={styles.header}>Textbook App</h2>
        </div>
          <h2>Books:</h2>
        <div className= {styles.bookStream}>
          <BookStream books={this.state.books}/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.reducer.user,
    token: state.reducer.token,
    router: state.router
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
};

HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePage;
