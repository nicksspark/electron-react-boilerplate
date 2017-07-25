import React, {Component} from 'react';
import styles from '../containers/css/styles.css';

class Book extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.bookContainer}>
        <div>
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
