import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import { Redirect } from 'react-router';
import axios from 'axios';
import { loaded } from '../actions/index';
import styles from './css/styles.css';
import { Link } from 'react-router-dom';
import CSSstyles from './ReadPage.css';
// import Reader from '../components/Reader';
import RaisedButton from 'material-ui/RaisedButton';


//window.getSelection()
//

class ReadPage extends Component {
  constructor() {
    super();
    this.state = {
      home: false
    };
  }
  // componentDidMount() {
  //   const script3 = document.createElement("script");
  //   script3.src = "./containers/pageviewer.js";
  //   script3.async = true;
  //   document.body.appendChild(script3);
  // }
  componentWillMount() {
    console.log('component is mounting.....');

    //add scripts
    // const script1 = document.createElement("script");
    // script1.src = "../node_modules/pdfjs-dist/web/pdf_viewer.js";
    // script1.async = true;
    // document.head.appendChild(script1);
    //
    // const script2 = document.createElement("script");
    // script2.src = "../node_modules/pdfjs-dist/build/pdf.js";
    // script2.async = true;
    // document.head.appendChild(script2);

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
    .then(() => {
      const script3 = document.createElement("script");
      script3.src = "./containers/pageviewer.js";
      script3.async = true;
      document.body.appendChild(script3);

      const link = document.createElement("link");
      link.href = "../node_modules/pdfjs-dist/web/pdf_viewer.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

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
        <div id="pageContainer" className="pdfViewer singlePageView"></div>
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
