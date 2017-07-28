import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import { Redirect } from 'react-router';
import axios from 'axios';
import { loaded } from '../actions/index';
import styles from './css/styles.css';
import { Link } from 'react-router-dom';
import CSSstyles from './ReadPage.css';
<<<<<<< HEAD
import Reader from '../components/Reader';
import RaisedButton from 'material-ui/RaisedButton';


//window.getSelection()
//
=======
>>>>>>> 08eb7012688776227f07f0ab781cabe7d30286ae

class ReadPage extends Component {
  constructor() {
    super();
    this.state = {
      home: false
    };
  }
  componentWillMount() {
    console.log('component is mounting.....');
    const path = this.props.path;
    console.log('path', path);
    const bookId = path.split('/')[2];
    axios.get('http://localhost:3000/read/' + bookId, {
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
    .then((res) => {
      console.log('RES', res);
      this.setState({
        book: res.data.book
      });
      this.props.loaded();
    })
    .catch((err) => {
      console.log('ERR', err);
    })
  }
  onHome() {
    this.props.loaded();
    this.setState({
      home: true
    });
  }
  render() {
    if (!this.props.token) {
      return <Redirect to='/login' />;
    }
    if (this.state.home) {
      return <Redirect to='/' />;
    }
    const book = this.state.book;
    const loading = this.props.loading;
    return (!loading &&
      <div>
        <div className={CSSstyles.home}>
          <RaisedButton label="Home" onClick={() => {this.onHome()}}/>
        </div>
        <div>
<<<<<<< HEAD
          <Reader />
=======
          <h1>
            {book.title}, {book.author}
          </h1>
          <div className={CSSstyles.page}>
            {book.text}
          </div>
>>>>>>> 08eb7012688776227f07f0ab781cabe7d30286ae
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.reducer.user,
    token: state.reducer.token,
    path: state.router.location.pathname,
    loading: state.loading.loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loaded: () => {
      dispatch(loaded())
    }
  };
};

ReadPage = connect(mapStateToProps, mapDispatchToProps)(ReadPage);

export default ReadPage;
