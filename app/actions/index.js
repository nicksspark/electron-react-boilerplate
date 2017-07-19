const login = () => {
  return {
    type: 'LOGIN'
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

export default {
  login: login,
  logout: logout,
  addBook: addBook,
  deleteBook: deleteBook
};
