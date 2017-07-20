/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ExplorePage from './containers/ExplorePage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';


export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/explore" component={ExplorePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Switch>
  </App>
);
