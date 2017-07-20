// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import BookStream from '../components/BookStream';

class HomePage extends Component {
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
  //   axios.post('/', {
  //     id: this.props.user.id
  //   })
  //   .then((res) => {
  //     this.setState({
  //       books: res.books
  //     })
  //   })
  // }
  render() {
    return (
      <div>
        <div>
          <h2>Textbook App</h2>
          <h2>Home</h2>
          <h2>User: {this.props.user.fname}</h2>
          <h2>Books:</h2>
          <BookStream books={this.state.books}/>
          <Link to="/explore">Explore</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.reducer,
    router: state.router
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBook: (id) => {
      dispatch(deleteBook(id))
    }
  }
};

HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePage;
