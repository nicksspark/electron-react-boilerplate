import React, {Container} from 'react';

class BookPage extends Container {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios.post('/read', {
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
        {book.content}
      </div>
    );
  }
}
