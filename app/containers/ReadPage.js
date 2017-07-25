import React, { Component } from 'react';

class ReadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios.post('http://localhost:3000/read', {
      id: this.props.id
    })
    .then((res) => {
      this.setState({
        book: res.book
      });
    })
  }
  render() {
    const book = this.state.book;
    return (
      <div>
        {book.title}
        {book.author}
        {book.text}
      </div>
    );
  }
}



export default ReadPage;
