// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import BookStream from '../components/BookStream';
import axios from 'axios';
import styles from './css/styles.css';
import { logout } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import CSSstyles from './Homepage.css';
//LOGO FONT: TAMIL MN

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      books: [
        // {
        //   title: 'Early Transcendentals',
        //   author: 'Stewart',
        //   image: 'https://images-na.ssl-images-amazon.com/images/I/51xUmFAz%2BVL._SX258_BO1,204,203,200_.jpg',
        //   id: '596fea7c734d1d6202a70d1f'
        // },
        // {
        //   title: 'Calculus',
        //   author: 'Anton, Bivens, Davis',
        //   image: 'https://prodimage.images-bn.com/pimages/9780470647691_p0_v2_s192x300.jpg',
        //   id: '2'
        // }
      ],
      open: false,
      explore: false
    };
  }
  componentDidMount() {
    axios.post('http://localhost:3000/', {
      id: this.props.user.id
      }, {
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
    .then((res) => {
      if (res.data.success) {
        this.setState({
          books: res.data.books
        });
        console.log('BOOKS', this.state.books);
      }
    })
    .catch((err) => {
      console.log('ERR', err);
    })
  }
  onLogout() {
    this.props.logout();
  }
  onExplore() {
    this.setState({
      explore: true
    })
  }
  onNav(e) {
    // This prevents ghost click.
    e.preventDefault();
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    if (!this.props.token) {
      return <Redirect to='/login' />;
    }
    if (this.state.explore) {
      return <Redirect to='/explore' />;
    }
    return (
      <div>
        <div className={CSSstyles.nav}>
          <RaisedButton
            onClick={(e) => this.onNav(e)}
            label="Navigate"
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            animation={PopoverAnimationVertical}
          >
            <Menu>
              <MenuItem primaryText="Explore" onClick={() => {this.onExplore()}}/>
              <MenuItem primaryText="Logout" onClick={() => {this.onLogout()}}/>
            </Menu>
          </Popover>
        </div>
        <div className={styles.container}>
          <img src='./visuals/logo-small.png'/>
        </div>
        <div className= {styles.bookStream}>
          <BookStream books={this.state.books}/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.reducer.user,
    token: state.reducer.token,
    router: state.router
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
};

HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePage;
