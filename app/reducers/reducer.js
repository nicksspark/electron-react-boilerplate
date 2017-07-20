import axios from 'axios';

export type reducerStateType = {
  +reducer: object
};

const reducer = (state = {
  fname: 'Nicholas',
  lname: 'Park',
  library: [1, 2, 3, 4, 5]
}, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'LOGIN':
    console.log('LOGIN TRIGGERED', action.username, action.password);
      axios.post('/login', {
        username: action.username,
        password: action.password
      })
      .then((res) => {
        return res.user
      });
    case 'ADD_BOOK':
      const bookId = action.id;
      newState = Object.assign(
        newState,
        {library: [...newState.library, bookId]}
      );
      axios.post('/download', {
        id: bookId
      })
      .then((res) => (newState))
      .catch((err) => (console.log('ERROR', err)));
    case 'DELETE_BOOK':
      const book = action.id;
      const newLib = [];
      newState.library.forEach((id) => {
        if (id !== book) {
          newLib.push(id);
        };
      });
      newState = Object.assign(
        newState,
        {library: newLib}
      );
      axios.post('/delete', {
        id: book
      })
      .then((res) => (newState));
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};

export default reducer;
