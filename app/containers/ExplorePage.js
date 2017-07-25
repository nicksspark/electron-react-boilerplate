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

class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      books: [
        // {
        //   title: 'Early Transcendentals',
        //   author: 'Stewart',
        //   image: 'https://images-na.ssl-images-amazon.com/images/I/51xUmFAz%2BVL._SX258_BO1,204,203,200_.jpg',
        //   id: 1
        // },
        // {
        //   title: 'Calculus',
        //   author: 'Anton, Bivens, Davis',
        //   image: 'https://prodimage.images-bn.com/pimages/9780470647691_p0_v2_s192x300.jpg',
        //   id: 2
        // }
      ]
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
  render() {
    if (!this.props.token) {
      return <Redirect to='/login' />;
    }
    return (
      <div>
        <h2 className={styles.header}>Explore</h2>
        <Link to="/">Back to home</Link>
        <BookStream books={this.state.books} />
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
