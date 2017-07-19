// @flow
import React, { Component } from 'react';
import Home from '../components/Home';

class HomePage extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Home />
    );
  }
};

mapStateToProps = (state) => {

}

mapDispatchToProps = (dispatch) => {

}

HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomePage;
