import React, { Component } from 'react';
import { Redirect } from 'react-router';

import styles from '../containers/css/styles.css';
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read: false
    }
  }
  onRead(e) {
    e.preventDefault();
    this.setState({
      read: true
    })
  }
  render() {
    if (this.state.read) {
      const bookId = this.props.book.id;
      return (
        <Redirect to={'/read/' + bookId}/>
      )
    }
    return (
      <div className={styles.bookContainer}>
        <div onClick={(e) => {this.onRead(e)}}>
          <img src={this.props.book.image}></img>
        </div>
        <div className={styles.titleContainer}>
          <div>
            <p>{this.props.book.title}</p>
          </div>
          <div className={styles.author}>
            <p>{this.props.book.author}</p>
          </div>
        </div>
    </div>
    );
  }
};

export default Book;
