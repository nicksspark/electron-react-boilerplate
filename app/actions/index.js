// import { configureStore, history } from './store/configureStore';
//
// const store = configureStore();
//
// const refreshLogin = (username, password) => {
//
//   // Invert control!
//   // Return a function that accepts `dispatch` so we can dispatch later.
//   // Thunk middleware knows how to turn thunk async actions into actions.
//
//   return function (dispatch) {
//     return login(username, password).then(
//       something
//     );
//   };
// }

const login = (user, token) => {
  return {
    type: 'LOGIN',
    user: user,
    token: token
  };
};

const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

const addBook = () => {
  return {
    type: 'ADD_BOOK'
  };
};

const deleteBook = () => {
  return {

  };
};

const loaded = () => {
  return {
    type: 'LOADED'
  };
};

export default {
  login: login,
  logout: logout,
  addBook: addBook,
  deleteBook: deleteBook,
  loaded: loaded
};
