/* eslint flowtype-errors/show-errors: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ExplorePage from './containers/ExplorePage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
// import ReadPage from './containers/ReadPage';


class Routes extends Component {
  render() {
    return (
      <App>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/explore" component={ExplorePage} />
          {/* <Route exact path="/read" component={ReadPage}/> */}
        </Switch>
      </App>
    );
  }
}

export default Routes;
