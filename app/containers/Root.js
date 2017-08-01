// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
// import App from './App';
// import LoginPage from './LoginPage';
// import RegisterPage from './RegisterPage';
// import HomePage from './HomePage';
// import ExplorePage from './ExplorePage';
// import { Switch, Route, Redirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

type RootType = {
  store: {},
  history: {}
};

export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider>
          <Routes />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}
