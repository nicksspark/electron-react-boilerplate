import React, {Component} from 'react';
import Book from './Book';
import styles from '../containers/css/styles.css';
class BookStream extends Component {
  constructor(props) {
    super(props);
  }
  getStream() {
    let books = this.props.books;
    books = books.map((book) => (Object.assign(book, {key: book._id})))
    books = books.map((book) => {
      return (
        <Book book={book} key={book.key}></Book>
      );
    });
    return books;
  }
  render() {
    return (
      <div className={styles.bookStream}>
        {this.getStream()}
      </div>
    );
  }
};

export default BookStream;
