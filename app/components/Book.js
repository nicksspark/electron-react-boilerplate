import React, {Component} from 'react';

class Book extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <img src={this.props.book.image}></img>
        <p>{this.props.book.title}</p>
        <p>{this.props.book.author}</p>
      </div>
    );
  }
};

export default Book;
