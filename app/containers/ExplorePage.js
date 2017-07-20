import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as Actions from '../actions/index';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Book from '../components/Book';
import BookStream from '../components/BookStream';

class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      books: [
        {
          title: 'Early Transcendentals',
          author: 'Stewart',
          image: 'https://images-na.ssl-images-amazon.com/images/I/51xUmFAz%2BVL._SX258_BO1,204,203,200_.jpg',
          id: 1
        },
        {
          title: 'Calculus',
          author: 'Anton, Bivens, Davis',
          image: 'https://prodimage.images-bn.com/pimages/9780470647691_p0_v2_s192x300.jpg',
          id: 2
        }
      ]
    };
  }

  // componentDidMount() {
  //   let books;
  //   axios.get('/explore')
  //   .then((res) => {
  //     books = res.books;
  //     this.setState({
  //       books: books
  //     })
  //   })
  //   .catch((err) => {
  //     console.log('ERR', err);
  //   });
  // }
  render() {
    return (
      <div>
        <h2>Explore</h2>
        <Link to="/">Back to home</Link>
        <BookStream books={this.state.books}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.reducer,
    location: state.router
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
};

ExplorePage = connect(mapStateToProps, mapDispatchToProps)(ExplorePage);

export default ExplorePage;
